"use client";

import { useMemo, useState } from "react";
import { SectionHeading } from "@maingame/components";
import { StreamPlatform } from "@maingame/types";
import {
  scheduledStreams,
  groupByHour,
  getStreamsForDay,
  type ScheduledStream,
} from "@/features/schedule/data/scheduled-streams";

type ViewMode = "day" | "week" | "month";

const START_HOUR = 0;
const END_HOUR = 23;
const DAY_ROW_HEIGHT = 80;

function formatHour(hour: number): string {
  if (hour === 0 || hour === 24) return "12 AM";
  if (hour === 12) return "12 PM";
  if (hour < 12) return `${hour} AM`;
  return `${hour - 12} PM`;
}

function formatDuration(minutes: number): string {
  if (minutes >= 60) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }
  return `${minutes}m`;
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  [StreamPlatform.Twitch]: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
    </svg>
  ),
  [StreamPlatform.YouTube]: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  [StreamPlatform.Kick]: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 11.5l-3 3-3-3-3 3-3-3 3-3-3-3 3-3 3 3 3-3 3 3-3 3z" />
    </svg>
  ),
};

function ScheduleCard({ stream }: { stream: ScheduledStream }) {
  return (
    <a
      href={`/streamers/${stream.slug}`}
      className="group flex-shrink-0 flex items-center gap-3 px-3 py-2 bg-[var(--color-surface)] border-l-4 border-[var(--color-brand)] hover:bg-[var(--color-surface-hover)] transition-colors min-w-[220px] max-w-[280px]"
    >
      <div className="relative flex-shrink-0">
        {stream.avatarUrl ? (
          <img
            src={stream.avatarUrl}
            alt={stream.displayName}
            className="w-10 h-10 object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-[var(--color-brand)] flex items-center justify-center text-sm font-bold text-[var(--color-brand-foreground)]">
            {stream.displayName.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-muted-foreground)]">
          {PLATFORM_ICONS[stream.primaryPlatform]}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-[var(--color-foreground)] truncate">
          {stream.displayName}
        </div>
        <div className="text-xs text-[var(--color-muted-foreground)] truncate">
          {stream.gameTitle} · {formatDuration(stream.durationMinutes)}
        </div>
      </div>
    </a>
  );
}

function CurrentTimeLine({ topOffset }: { topOffset: number }) {
  return (
    <div
      className="absolute left-0 right-0 z-10 pointer-events-none"
      style={{ top: `${topOffset}px` }}
    >
      <div className="flex items-center">
        <div className="w-3 h-3 bg-[var(--color-brand)] -ml-1.5" />
        <div className="flex-1 h-0.5 bg-[var(--color-brand)]" />
      </div>
    </div>
  );
}

function DayView() {
  const streamsByHour = useMemo(() => {
    const todayStreams = scheduledStreams.filter(
      (s) => s.scheduledAt.toDateString() === new Date().toDateString()
    );
    return groupByHour(todayStreams);
  }, []);

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const currentTimeTop =
    (currentHour - START_HOUR) * DAY_ROW_HEIGHT +
    (currentMinute / 60) * DAY_ROW_HEIGHT;

  const hasTodayEvents = Array.from(streamsByHour.values()).some(
    (streams) => streams.length > 0
  );

  return (
    <div className="relative bg-[var(--color-surface)] border border-[var(--color-border-light)] overflow-hidden">
      {currentHour >= START_HOUR && currentHour <= END_HOUR && (
        <CurrentTimeLine topOffset={currentTimeTop} />
      )}

      {Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => {
        const hour = START_HOUR + i;
        const streams = streamsByHour.get(hour) || [];
        const isEmpty = streams.length === 0;

        return (
          <div
            key={hour}
            className="flex border-t border-[var(--color-border-light)] first:border-t-0"
            style={{ minHeight: `${DAY_ROW_HEIGHT}px` }}
          >
            <div className="w-20 flex-shrink-0 px-3 py-3 text-right border-r border-[var(--color-border-light)]">
              <span
                className={`text-xs font-medium ${
                  isEmpty
                    ? "text-[var(--color-muted)]"
                    : "text-[var(--color-foreground)]"
                }`}
              >
                {formatHour(hour)}
              </span>
            </div>

            <div className="flex-1 px-3 py-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {isEmpty ? (
                <div className="h-full flex items-center">
                  <div className="w-full h-px border-t border-dashed border-[var(--color-border-light)]" />
                </div>
              ) : (
                <div className="flex gap-3 items-center min-h-full">
                  {streams.map((stream, idx) => (
                    <ScheduleCard
                      key={`${stream.slug}-${idx}`}
                      stream={stream}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {!hasTodayEvents && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface)]/80">
          <p className="text-[var(--color-muted-foreground)] text-sm">
            No streams scheduled for today
          </p>
        </div>
      )}
    </div>
  );
}

function WeekView() {
  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  const dayStreams = useMemo(() => {
    const map = new Map<string, ScheduledStream[]>();
    for (const day of weekDays) {
      const key = day.toDateString();
      map.set(key, getStreamsForDay(scheduledStreams, day));
    }
    return map;
  }, [weekDays]);

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border-light)] overflow-hidden">
      {weekDays.map((day, i) => {
        const isToday = day.toDateString() === today.toDateString();
        const streams = dayStreams.get(day.toDateString()) || [];
        const isEmpty = streams.length === 0;

        return (
          <div
            key={i}
            className="flex border-t border-[var(--color-border-light)] first:border-t-0"
            style={{ minHeight: "100px" }}
          >
            <div
              className={`w-20 flex-shrink-0 px-3 py-3 text-right border-r border-[var(--color-border-light)] ${
                isToday ? "bg-[var(--color-brand-muted)]" : ""
              }`}
            >
              <div className="text-xs text-[var(--color-muted-foreground)]">
                {DAY_NAMES[day.getDay()]}
              </div>
              <div
                className={`text-lg font-semibold ${
                  isToday
                    ? "text-[var(--color-brand)]"
                    : "text-[var(--color-foreground)]"
                }`}
              >
                {day.getDate()}
              </div>
              {!isEmpty && (
                <div className="text-[10px] text-[var(--color-muted-foreground)] mt-1">
                  {streams.length} stream{streams.length > 1 ? "s" : ""}
                </div>
              )}
            </div>

            <div className="flex-1 px-3 py-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {isEmpty ? (
                <div className="h-full flex items-center">
                  <div className="w-full h-px border-t border-dashed border-[var(--color-border-light)]" />
                </div>
              ) : (
                <div className="flex gap-3 items-center min-h-full">
                  {streams.map((stream, idx) => (
                    <ScheduleCard
                      key={`${stream.slug}-${idx}`}
                      stream={stream}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MonthView() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const monthStreams = scheduledStreams.filter(
    (s) => s.scheduledAt.getFullYear() === year && s.scheduledAt.getMonth() === month
  );

  const streamsByDate = useMemo(() => {
    const map = new Map<number, ScheduledStream[]>();
    for (const stream of monthStreams) {
      const date = stream.scheduledAt.getDate();
      if (!map.has(date)) {
        map.set(date, []);
      }
      map.get(date)!.push(stream);
    }
    return map;
  }, [monthStreams]);

  const today = now.getDate();
  const monthName = firstDay.toLocaleString("default", { month: "long" });

  const cells: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= totalDays; d++) {
    cells.push(d);
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border-light)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--color-border-light)]">
        <h3 className="text-sm font-semibold text-[var(--color-foreground)]">
          {monthName} {year}
        </h3>
        <p className="text-xs text-[var(--color-muted-foreground)]">
          {monthStreams.length} streams this month
        </p>
      </div>

      <div className="grid grid-cols-7 border-b border-[var(--color-border-light)]">
        {DAY_NAMES.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs font-medium text-[var(--color-muted-foreground)] border-r border-[var(--color-border-light)] last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {weeks.map((week, weekIdx) => (
        <div
          key={weekIdx}
          className="grid grid-cols-7 border-b border-[var(--color-border-light)] last:border-b-0"
        >
          {week.map((day, dayIdx) => {
            if (day === null) {
              return (
                <div
                  key={dayIdx}
                  className="min-h-[80px] border-r border-[var(--color-border-light)] last:border-r-0 bg-[var(--color-neutral-100)]/30"
                />
              );
            }

            const isToday = day === today;
            const streams = streamsByDate.get(day) || [];

            return (
              <div
                key={dayIdx}
                className={`min-h-[80px] border-r border-[var(--color-border-light)] last:border-r-0 p-1 ${
                  isToday ? "bg-[var(--color-brand-muted)]" : ""
                }`}
              >
                <div
                  className={`text-xs font-medium mb-1 ${
                    isToday
                      ? "text-[var(--color-brand)]"
                      : "text-[var(--color-foreground)]"
                  }`}
                >
                  {day}
                </div>
                {streams.slice(0, 2).map((stream, sIdx) => (
                  <a
                    key={sIdx}
                    href={`/streamers/${stream.slug}`}
                    className="block mb-0.5 px-1 py-0.5 bg-[var(--color-brand-muted)] border-l-2 border-[var(--color-brand)] hover:bg-[var(--color-brand)]/20 transition-colors text-[9px] truncate"
                    title={`${stream.displayName} - ${stream.gameTitle}`}
                  >
                    {stream.displayName}
                  </a>
                ))}
                {streams.length > 2 && (
                  <div className="text-[9px] text-[var(--color-muted-foreground)] px-1">
                    +{streams.length - 2} more
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function TabBar({
  view,
  onViewChange,
}: {
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
}) {
  const tabs: { value: ViewMode; label: string }[] = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ];

  return (
    <div className="flex gap-1 mb-4 border-b border-[var(--color-border-light)]">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onViewChange(tab.value)}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
            view === tab.value
              ? "text-[var(--color-brand)] border-[var(--color-brand)]"
              : "text-[var(--color-muted-foreground)] border-transparent hover:text-[var(--color-foreground)]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function ScheduleSection() {
  const [view, setView] = useState<ViewMode>("day");

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-4">
          <SectionHeading text1="Today's" text2="Schedule" />
        </div>

        <TabBar view={view} onViewChange={setView} />

        {view === "day" && <DayView />}
        {view === "week" && <WeekView />}
        {view === "month" && <MonthView />}
      </div>
    </section>
  );
}
