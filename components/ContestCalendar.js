"use client";
import { useMemo, useState } from "react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formatMonthLabel = (date) =>
  new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(
    date,
  );

const formatEventDate = (dateString) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(dateString));

const dateKey = (date) => date.toISOString().split("T")[0];

export default function ContestCalendar({ contests = [] }) {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());

  const eventsByDay = useMemo(() => {
    const map = {};
    contests.forEach((contest) => {
      const eventDate = new Date(contest.start_datetime);
      const key = dateKey(eventDate);
      if (!map[key]) map[key] = [];
      map[key].push(contest);
    });
    Object.values(map).forEach((events) => {
      events.sort(
        (a, b) =>
          new Date(a.start_datetime).getTime() -
          new Date(b.start_datetime).getTime(),
      );
    });
    return map;
  }, [contests]);

  const firstOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  );
  const lastOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  );
  const emptyDays = Array.from(
    { length: firstOfMonth.getDay() },
    (_, index) => index,
  );
  const monthDays = Array.from(
    { length: lastOfMonth.getDate() },
    (_, index) =>
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), index + 1),
  );

  const contestCountThisMonth = monthDays.reduce((count, day) => {
    return count + (eventsByDay[dateKey(day)]?.length || 0);
  }, 0);

  const goPrevMonth = () =>
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  const goNextMonth = () =>
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 24,
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: 28 }}>
            {formatMonthLabel(currentMonth)}
          </h2>
          <p style={{ margin: "8px 0 0", color: "#6b7280" }}>
            {contestCountThisMonth} contest
            {contestCountThisMonth === 1 ? "" : "s"} marked this month
          </p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            type="button"
            onClick={goPrevMonth}
            style={{
              border: "1px solid #d1d5db",
              borderRadius: 8,
              background: "white",
              color: "#111827",
              padding: "10px 14px",
              cursor: "pointer",
            }}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={goNextMonth}
            style={{
              border: "1px solid #d1d5db",
              borderRadius: 8,
              background: "white",
              color: "#111827",
              padding: "10px 14px",
              cursor: "pointer",
            }}
          >
            Next
          </button>
        </div>
      </div>

      <div style={{ overflowX: "auto", marginBottom: 16 }}>
        <div
          style={{
            display: "grid",
            minWidth: 760,
            gridTemplateColumns: "repeat(7, minmax(100px, 1fr))",
            gap: 8,
          }}
        >
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              style={{
                padding: 12,
                fontWeight: 700,
                textAlign: "center",
                background: "#f3f4f6",
                borderRadius: 12,
              }}
            >
              {day}
            </div>
          ))}

          {emptyDays.map((empty) => (
            <div key={`empty-${empty}`} style={{ minHeight: 110 }} />
          ))}

          {monthDays.map((day) => {
            const key = dateKey(day);
            const dayEvents = eventsByDay[key] || [];
            return (
              <div
                key={key}
                style={{
                  minHeight: 122,
                  border: "1px solid #e5e7eb",
                  borderRadius: 16,
                  padding: 10,
                  background: dayEvents.length ? "#eff6ff" : "white",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontWeight: 700 }}>{day.getDate()}</span>
                  {dayEvents.length > 0 && (
                    <span
                      style={{
                        borderRadius: 9999,
                        background: "#bfdbfe",
                        padding: "2px 8px",
                        fontSize: 12,
                        color: "#1d4ed8",
                      }}
                    >
                      {dayEvents.length}
                    </span>
                  )}
                </div>
                <div style={{ display: "grid", gap: 6, flex: 1 }}>
                  {dayEvents.slice(0, 2).map((event) => (
                    <a
                      key={event.id}
                      href={event.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "block",
                        padding: "8px 10px",
                        borderRadius: 12,
                        background: "#dbeafe",
                        color: "#1e3a8a",
                        textDecoration: "none",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      {event.platform} {event.name}
                    </a>
                  ))}
                  {dayEvents.length > 2 && (
                    <span style={{ color: "#475569", fontSize: 12 }}>
                      +{dayEvents.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <section style={{ marginTop: 16 }}>
          <h3 style={{ marginBottom: 12, fontSize: 20 }}>Upcoming contests</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 12,
            }}
          >
            {contests.slice(0, 12).map((contest) => (
              <article
                key={contest.id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 16,
                  padding: 16,
                  background: "white",
                  display: "grid",
                  rowGap: 6,
                }}
              >
                <a
                  href={contest.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontWeight: 700,
                    color: "#1d4ed8",
                    textDecoration: "none",
                  }}
                >
                  {contest.name}
                </a>
                <p style={{ margin: 0, color: "#475569" }}>
                  {contest.platform} • {formatEventDate(contest.start_datetime)}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
