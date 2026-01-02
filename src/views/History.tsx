import React, { useMemo, useState } from "react";
import { Search, Calendar, Edit2, Trash2 } from "lucide-react";
import { Entry, EntryType } from "../types";

type FilterType = EntryType | "ALL";

interface HistoryProps {
  entries: Entry[];
  onEdit: (entry: Entry) => void;
  onDelete: (id: string) => void;
}

const History: React.FC<HistoryProps> = ({
  entries,
  onEdit,
  onDelete,
}) => {
  const [filter, setFilter] = useState<FilterType>("ALL");
  const [search, setSearch] = useState("");

  const filteredEntries = useMemo(() => {
    return entries
      .filter(
        (e) => filter === "ALL" || e.type === filter
      )
      .filter((e) => {
        const text = Object.values(e.responses || {})
          .join(" ")
          .toLowerCase();
        return text.includes(search.toLowerCase());
      })
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      );
  }, [entries, filter, search]);

  const getEntryBadgeStyle = (type: EntryType) => {
    switch (type) {
      case EntryType.DAILY:
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case EntryType.WEEKLY:
        return "bg-indigo-50 text-indigo-600 border-indigo-100";
      case EntryType.MONTHLY:
        return "bg-amber-50 text-amber-600 border-amber-100";
      case EntryType.YEARLY:
        return "bg-purple-50 text-purple-600 border-purple-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  const getEntryPreview = (entry: Entry) =>
    Object.values(entry.responses || {}).find(Boolean) ||
    "No reflection provided.";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Timeline
        </h1>
        <p className="text-slate-500">
          Relive your progress and insights.
        </p>
      </header>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full flex-grow">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your thoughts..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
          {(["ALL", ...Object.values(EntryType)] as FilterType[]).map(
            (type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all whitespace-nowrap ${filter === type
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500"
                  }`}
              >
                {type}
              </button>
            )
          )}
        </div>
      </div>

      {/* Entries */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-slate-400">
              No entries found.
            </p>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-100 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${getEntryBadgeStyle(
                      entry.type
                    )}`}
                  >
                    {entry.type}
                  </span>

                  <span className="flex items-center gap-1 text-slate-400 text-xs">
                    <Calendar size={12} />
                    {new Date(entry.date).toLocaleDateString(
                      undefined,
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(entry)}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                    aria-label="Edit entry"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(entry.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    aria-label="Delete entry"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {entry.mood !== undefined && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">
                      Mood:
                    </span>
                    <span className="text-xs font-bold text-indigo-500">
                      {entry.mood}/10
                    </span>
                  </div>
                )}

                <p className="text-slate-600 dark:text-slate-300 line-clamp-2 italic">
                  “{getEntryPreview(entry)}”
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
