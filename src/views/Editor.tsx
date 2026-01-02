import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { ArrowLeft, Save, CheckCircle } from "lucide-react";
import { Entry, EntryType } from "../types";
import { QUESTIONS, RATINGS } from "../constants";
import MoodSelector from "../components/MoodSelector";

interface EditorProps {
  type: EntryType;
  initialEntry?: Entry;
  onSave: (entry: Partial<Entry>) => void;
  onClose: () => void;
}

const Editor: React.FC<EditorProps> = ({
  type,
  initialEntry,
  onSave,
  onClose,
}) => {
  const [mood, setMood] = useState<number | undefined>(
    initialEntry?.mood
  );
  const [responses, setResponses] = useState<Record<string, string>>(
    initialEntry?.responses || {}
  );
  const [ratings, setRatings] = useState<Record<string, number>>(
    initialEntry?.ratings || {}
  );
  const [isSaving, setIsSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [dirty, setDirty] = useState(false);

  const questions = QUESTIONS[type];
  const ratingKeys = RATINGS[type] || [];

  /* ---------------- helpers ---------------- */

  const hasContent = useMemo(() => {
    return (
      Object.values(responses).some(Boolean) ||
      Object.values(ratings).length > 0 ||
      mood !== undefined
    );
  }, [responses, ratings, mood]);

  const handleResponseChange = useCallback(
    (id: string, value: string) => {
      setDirty(true);
      setResponses((prev) => ({ ...prev, [id]: value }));
    },
    []
  );

  const handleRatingChange = useCallback(
    (id: string, value: number) => {
      setDirty(true);
      setRatings((prev) => ({ ...prev, [id]: value }));
    },
    []
  );

  const saveEntry = useCallback(() => {
    if (!hasContent) return;

    setIsSaving(true);

    onSave({
      type,
      mood,
      responses,
      ratings,
      date: initialEntry?.date || new Date().toISOString(),
    });

    setTimeout(() => {
      setIsSaving(false);
      setSavedAt(Date.now());
      setDirty(false);
      setTimeout(() => setSavedAt(null), 2500);
    }, 400);
  }, [hasContent, mood, responses, ratings, type, initialEntry, onSave]);

  /* ---------------- autosave ---------------- */

  useEffect(() => {
    if (!dirty) return;

    const autoSave = setTimeout(() => {
      saveEntry();
    }, 2000);

    return () => clearTimeout(autoSave);
  }, [dirty, saveEntry]);

  /* ---------------- leave warning ---------------- */

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!dirty) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  /* ---------------- render ---------------- */

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Header */}
      <header className="flex items-center justify-between sticky top-0 z-10 py-4 glass-card -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {initialEntry
                ? "Editing Entry"
                : `New ${type.toLowerCase()} reflection`}
            </h1>
            <p className="text-xs text-slate-500">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {savedAt && (
            <span className="text-emerald-500 text-xs flex items-center gap-1 animate-pulse">
              <CheckCircle size={14} /> Saved
            </span>
          )}

          <button
            onClick={saveEntry}
            disabled={!hasContent || isSaving}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-100 dark:shadow-none hover:bg-indigo-700 transition-all disabled:opacity-40"
          >
            <Save size={18} />
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto space-y-12">
        {/* Mood */}
        {type === EntryType.DAILY && (
          <section className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
            <MoodSelector value={mood} onChange={setMood} />
          </section>
        )}

        {/* Questions */}
        <div className="space-y-10">
          {questions.map((q) => (
            <section key={q.id} className="space-y-3">
              <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                {q.label}
              </label>
              <textarea
                value={responses[q.id] || ""}
                onChange={(e) =>
                  handleResponseChange(q.id, e.target.value)
                }
                placeholder={q.placeholder}
                className="w-full min-h-[120px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none"
              />
            </section>
          ))}
        </div>

        {/* Ratings */}
        {ratingKeys.length > 0 && (
          <section className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl space-y-8 border border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-semibold">
              Self Rating (1–10)
            </h3>

            {ratingKeys.map((key) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">
                    {key}
                  </span>
                  <span className="text-xs font-bold text-indigo-600">
                    {(ratings[key] ?? 5)} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={ratings[key] ?? 5}
                  onChange={(e) =>
                    handleRatingChange(key, +e.target.value)
                  }
                  className="w-full accent-indigo-500"
                />
              </div>
            ))}
          </section>
        )}

        <div className="pt-8 border-t text-center">
          <p className="text-slate-400 italic text-sm">
            “Growth is a slow, steady journey.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default Editor;

