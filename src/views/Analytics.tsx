import React, { useMemo } from "react";
import { AppState, EntryType } from "../types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface AnalyticsProps {
  state: AppState;
}

const MAX_MOOD_DAYS = 14;

const getMoodColor = (mood?: number) => {
  if (!mood) return "#c7d2fe";
  if (mood >= 8) return "#6366f1"; // strong
  if (mood >= 5) return "#818cf8"; // neutral
  return "#a5b4fc"; // low
};

const Analytics: React.FC<AnalyticsProps> = ({ state }) => {
  const { entries, stats } = state;

  /* ---------------- derived data ---------------- */

  const entriesByType = useMemo(() => {
    return Object.values(EntryType).map((type) => ({
      name: type,
      count: entries.filter((e) => e.type === type).length,
    }));
  }, [entries]);

  const moodData = useMemo(() => {
    return entries
      .filter((e) => e.type === EntryType.DAILY && e.mood !== undefined)
      .sort(
        (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      )
      .slice(-MAX_MOOD_DAYS)
      .map((e) => ({
        date: new Date(e.date).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        }),
        mood: e.mood as number,
      }));
  }, [entries]);

  const avgMood = useMemo(() => {
    if (moodData.length === 0) return "0.0";
    const total = moodData.reduce((acc, curr) => acc + curr.mood, 0);
    return (total / moodData.length).toFixed(1);
  }, [moodData]);

  /* ---------------- render ---------------- */

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Analytics
        </h1>
        <p className="text-slate-500">
          Meaningful insights into your habit of reflection.
        </p>
      </header>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Current Streak"
          value={stats.currentStreak}
          hint="Active now"
          hintColor="text-emerald-500"
        />
        <StatCard
          label="Longest Streak"
          value={stats.longestStreak}
          hint="Personal record"
        />
        <StatCard
          label="Avg Mood (14d)"
          value={avgMood}
          hint="Out of 10"
          hintColor="text-indigo-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mood trend */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-6">
          <h3 className="font-semibold">
            Recent Mood Trend
          </h3>

          <div className="h-64">
            {moodData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={moodData}>
                  <XAxis
                    dataKey="date"
                    fontSize={10}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide domain={[0, 10]} />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      borderRadius: 12,
                      border: "none",
                      boxShadow:
                        "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="mood" radius={[6, 6, 0, 0]}>
                    {moodData.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={getMoodColor(entry.mood)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChart text="Log more daily moods to see trends" />
            )}
          </div>
        </section>

        {/* Entry distribution */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-6">
          <h3 className="font-semibold">
            Entry Distribution
          </h3>

          <div className="space-y-4">
            {entriesByType.map((item) => {
              const percentage =
                entries.length > 0
                  ? (item.count / entries.length) * 100
                  : 0;

              return (
                <div key={item.name} className="space-y-2">
                  <div className="flex justify-between text-xs font-medium uppercase text-slate-500">
                    <span>{item.name}</span>
                    <span>{item.count}</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full">
                    <div
                      className="bg-indigo-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Insight */}
      <div className="bg-indigo-50 dark:bg-indigo-950/20 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-900/50">
        <h3 className="font-semibold mb-2">
          Consistency matters
        </h3>
        <p className="text-sm leading-relaxed text-indigo-700 dark:text-indigo-300">
          The goal of MindLog isn’t perfection, but clarity.
          You’ve written <strong>{entries.length}</strong>{" "}
          times so far — each one is a step forward.
        </p>
      </div>
    </div>
  );
};

/* ---------------- small components ---------------- */

const StatCard = ({
  label,
  value,
  hint,
  hintColor = "text-slate-400",
}: {
  label: string;
  value: number | string;
  hint: string;
  hintColor?: string;
}) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
    <p className="text-sm text-slate-500 mb-1">{label}</p>
    <p className="text-4xl font-bold">{value}</p>
    <p className={`text-xs mt-2 ${hintColor}`}>{hint}</p>
  </div>
);

const EmptyChart = ({ text }: { text: string }) => (
  <div className="h-full flex items-center justify-center text-slate-400 text-sm italic">
    {text}
  </div>
);

export default Analytics;
