import ContestCalendar from "@/components/ContestCalendar";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

async function fetchContests() {
  const codechefResponse = await fetch(
    "https://www.codechef.com/api/list/contests/all",
    { cache: "no-store" },
  );
  if (!codechefResponse.ok)
    throw new Error("Failed to fetch CodeChef contests");
  const codechefData = await codechefResponse.json();
  const codechefContests = codechefData.future_contests;

  const codeforcesResponse = await fetch(
    "https://codeforces.com/api/contest.list",
    {
      cache: "no-store",
    },
  );
  if (!codeforcesResponse.ok)
    throw new Error("Failed to fetch Codeforces contests");
  const codeforcesData = await codeforcesResponse.json();
  const codeforcesContests = codeforcesData.result;

  const leetcodeQuery = `
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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: leetcodeQuery }),
    cache: "no-store",
  });
  if (!leetcodeResponse.ok)
    throw new Error("Failed to fetch LeetCode contests");
  const leetcodeData = await leetcodeResponse.json();
  const leetcodeContests = leetcodeData.data.upcomingContests || [];

  const formattedCodechef = codechefContests.map((contest) => ({
    id: contest.contest_code,
    name: contest.contest_name.startsWith("CodeChef")
      ? contest.contest_name
      : `CodeChef ${contest.contest_name}`,
    platform: "CodeChef",
    start_datetime: contest.contest_start_date_iso,
    duration_seconds: contest.contest_duration_seconds || 7200,
    url: `https://www.codechef.com/${contest.contest_code}`,
  }));

  const formattedCodeforces = codeforcesContests
    .filter(
      (contest) => contest.phase === "BEFORE" || contest.phase === "CODING",
    )
    .map((contest) => ({
      id: contest.id.toString(),
      name: contest.name,
      platform: "CodeForces",
      start_datetime: new Date(contest.startTimeSeconds * 1000).toISOString(),
      duration_seconds: contest.durationSeconds || 7200,
      url: `https://codeforces.com/contests/${contest.id}`,
    }));

  const formattedLeetcode = leetcodeContests.map((contest) => {
    const slug = contest.title.toLowerCase().replace(/\s+/g, "-");
    return {
      id: slug,
      name: contest.title.startsWith("LeetCode")
        ? contest.title
        : `LeetCode ${contest.title}`,
      platform: "LeetCode",
      start_datetime: new Date(contest.startTime * 1000).toISOString(),
      duration_seconds: contest.duration || 7200,
      url: `https://leetcode.com/contest/${slug}`,
    };
  });

  return [
    ...formattedCodechef,
    ...formattedCodeforces,
    ...formattedLeetcode,
  ].sort(
    (a, b) =>
      new Date(a.start_datetime).getTime() -
      new Date(b.start_datetime).getTime(),
  );
}

export default async function Calendar() {
  const contests = await fetchContests();

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* <section className="rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Contest Calendar
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">
            View upcoming programming contests on a responsive monthly calendar,
            with contest days marked and easy navigation for laptop, tablet, and
            mobile screens. Tap a contest to open the event page and use the
            calendar view to plan your next practice session.
          </p>
        </section> */}

        <ContestCalendar contests={contests} />

        {/* <section className="rounded-3xl bg-slate-50 p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-900">
            About this calendar
          </h2>
          <div className="mt-4 space-y-4 text-slate-700 leading-7">
            <p>
              This calendar aggregates contests from CodeChef, Codeforces, and
              LeetCode in one place. It helps you quickly identify which days
              have live contests and lets you navigate across months on any
              device.
            </p>
            <p>
              For each contest day, the event cells show the number of contests
              scheduled. Use the <strong>Previous</strong> and{" "}
              <strong>Next</strong> buttons to switch months, and tap the
              contest entries to open the contest page.
            </p>
            <p>
              The layout is optimized for laptop, iPad, and iPhone views, with
              responsive spacing and a flexible event list that adapts to
              smaller screens.
            </p>
          </div>
        </section> */}
      </div>
    </div>
  );
}
