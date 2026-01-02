import React, { useMemo } from "react";
import { Calendar, Flame, ChevronRight } from "lucide-react";
import { AppState, EntryType } from "../types";

interface HomeProps {
  state: AppState;
  onWrite: (type: EntryType) => void;
}

const Home: React.FC<HomeProps> = ({ state, onWrite }) => {
  const today = new Date();

  const dateString = useMemo(
    () =>
      today.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    []
  );

  const greeting = useMemo(() => {
    const hour = today.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  const lastEntry = state.entries.at(-1);

  const lastEntryPreview =
    lastEntry &&
    Object.values(lastEntry.responses || {}).find(Boolean);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <header className="space-y-2">
        <p className="text-slate-500 font-medium tracking-wide uppercase text-xs">
          {dateString}
        </p>

        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {greeting},{" "}
          <span className="text-indigo-500">Seeker</span>.
        </h1>

        <p className="text-lg text-slate-500 max-w-lg">
          A quiet place to reflect on your journey today.
        </p>
      </header>

      {/* Stats + Action */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Streak */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-2xl">
              <Flame className="text-orange-500" size={24} />
            </div>
            <p className="text-slate-400 text-sm font-medium">
              Daily Streak
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-5xl font-bold text-slate-900 dark:text-slate-100">
              {state.stats.currentStreak}
            </h3>
            <p className="text-slate-500">Days of reflection</p>
          </div>

          <div className="mt-8 text-sm text-slate-400">
            Best streak: {state.stats.longestStreak} days
          </div>
        </div>

        {/* Daily write */}
        <button
          onClick={() => onWrite(EntryType.DAILY)}
          className="bg-indigo-600 p-8 rounded-3xl shadow-xl shadow-indigo-200 dark:shadow-none flex flex-col justify-between group text-left hover:bg-indigo-700 transition-all"
          aria-label="Write daily reflection"
        >
          <div className="flex items-center justify-between mb-6 text-white/80">
            <Calendar size={24} />
            <p className="text-sm font-medium">Daily Reflection</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">
              Record your thoughts for today
            </h3>

            <span className="inline-flex items-center gap-2 text-white bg-white/20 px-6 py-3 rounded-2xl font-medium transition-all group-hover:gap-4">
              Write Today
              <ChevronRight size={18} />
            </span>
          </div>
        </button>
      </div>

      {/* Last Entry */}
      {lastEntry && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Your last entry
          </h2>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-500 uppercase">
                {lastEntry.type}
              </span>
              <span className="text-xs text-slate-400">
                {new Date(lastEntry.date).toLocaleDateString()}
              </span>
            </div>

            <p className="text-slate-600 dark:text-slate-300 line-clamp-3 italic">
              “{lastEntryPreview || "No content written yet…"}”
            </p>
          </div>
        </section>
      )}

      {/* Other entries */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            type: EntryType.WEEKLY,
            label: "Weekly Review",
            desc: "Reflect on your week",
          },
          {
            type: EntryType.MONTHLY,
            label: "Monthly Recap",
            desc: "Review the month",
          },
          {
            type: EntryType.YEARLY,
            label: "Yearly Reflection",
            desc: "The big picture",
          },
        ].map((item) => (
          <button
            key={item.type}
            onClick={() => onWrite(item.type)}
            className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-left hover:border-indigo-200 transition-colors group"
          >
            <h4 className="font-semibold mb-1 group-hover:text-indigo-600 transition-colors">
              {item.label}
            </h4>
            <p className="text-sm text-slate-500">{item.desc}</p>
          </button>
        ))}
      </section>
    </div>
  );
};

export default Home;
