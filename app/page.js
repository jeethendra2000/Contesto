import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ContestCard from "@/components/ContestComponents/contestCard";

// 👇 force dynamic rendering on Vercel
export const dynamic = "force-dynamic";

// 👇 tells Next.js to refresh data every 1 Hour
export const revalidate = 3600;

export default async function Home(params) {
  // --- Fetch CodeChef Contests ---
  const response = await fetch(
    "https://www.codechef.com/api/list/contests/all",
    { cache: "no-store" }, // ⬅️ disable caching
  );
  if (!response.ok) throw new Error("Failed to fetch CodeChef contests");
  const data = await response.json();
  const codechefContests = data.future_contests;

  // --- Fetch Codeforces Contests ---
  const response2 = await fetch("https://codeforces.com/api/contest.list", {
    cache: "no-store",
  });
  if (!response2.ok) throw new Error("Failed to fetch Codeforces contests");
  const data2 = await response2.json();
  const codeforcesRaw = data2.result;

  const now = Math.floor(Date.now() / 1000);
  const codeforcesContests = codeforcesRaw.filter(
    (c) => c.startTimeSeconds > now,
  );

  // --- Fetch LeetCode Contests ---
  const query = `
  query {
    upcomingContests {
      title
      startTime
      duration
    }
  }
`;

  const leetcodeResponse = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    cache: "no-store",
  });

  const result = await leetcodeResponse.json();
  const leetcodeContests = result.data.upcomingContests;

  // --- Normalize all contests to a shared format ---
  const formattedCodechef = codechefContests.map((contest) => ({
    id: contest.contest_code,
    name: contest.contest_name.startsWith("CodeChef")
      ? contest.contest_name
      : `CodeChef ${contest.contest_name}`,
    platform: "CodeChef",
    start_time: formatDate(contest.contest_start_date_iso),
    start_datetime: contest.contest_start_date_iso,
    start_timestamp: new Date(contest.contest_start_date_iso).getTime(),
    duration_seconds: contest.contest_duration_seconds || 7200,
    url: `https://www.codechef.com/${contest.contest_code}`,
  }));

  const formattedCodeforces = codeforcesContests.map((contest) => ({
    id: contest.id.toString(),
    name: contest.name,
    platform: "CodeForces",
    start_time: formatDate(new Date(contest.startTimeSeconds * 1000)),
    start_datetime: new Date(contest.startTimeSeconds * 1000).toISOString(),
    start_timestamp: contest.startTimeSeconds * 1000,
    duration_seconds: contest.durationSeconds || 7200,
    url:
      contest.phase === "BEFORE"
        ? `https://codeforces.com/contests/${contest.id}`
        : `https://codeforces.com/contest/${contest.id}`,
  }));

  const formattedLeetcode = leetcodeContests.map((contest) => {
    const slug = contest.title.toLowerCase().replace(/\s+/g, "-");
    return {
      id: slug,
      name: contest.title.startsWith("LeetCode")
        ? contest.title
        : `LeetCode ${contest.title}`,
      platform: "LeetCode",
      start_time: formatDate(new Date(contest.startTime * 1000)),
      start_datetime: new Date(contest.startTime * 1000).toISOString(),
      start_timestamp: contest.startTime * 1000,
      duration_seconds: contest.duration || 7200,
      url: `https://leetcode.com/contest/${slug}`,
    };
  });

  // Combine and optionally sort by start time
  const allContests = [
    ...formattedCodechef,
    ...formattedCodeforces,
    ...formattedLeetcode,
  ].sort((a, b) => a.start_timestamp - b.start_timestamp);

  return (
    <div style={{ padding: "1rem" }}>
      <Typography variant="h4" align="center" gutterBottom color="textPrimary">
        Contests
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 12, sm: 12, md: 12 }}
      >
        {allContests.map((contest) => (
          <Grid
            key={contest.id}
            size={{ xs: 12, sm: 6, md: 4 }}
            sx={{ display: "flex" }}
          >
            <ContestCard
              name={contest.name}
              site={contest.platform}
              start_time={contest.start_time}
              start_datetime={contest.start_datetime}
              duration_seconds={contest.duration_seconds}
              url={contest.url}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

function formatDate(dateStringOrDate) {
  const date = new Date(dateStringOrDate);
  return date
    .toLocaleString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    })
    .replace("am", "AM")
    .replace("pm", "PM");
}
