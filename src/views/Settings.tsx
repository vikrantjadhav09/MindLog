import React, { useEffect } from "react";
import {
  Shield,
  Moon,
  Sun,
  Download,
  Trash2,
  Info,
} from "lucide-react";

interface SettingsProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  onExport: () => void;
  onClearData: () => void;
}

const Settings: React.FC<SettingsProps> = ({
  theme,
  setTheme,
  onExport,
  onClearData,
}) => {

  // 🔹 Sync theme with <html> class
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Settings
        </h1>
        <p className="text-slate-500">Manage your private workspace.</p>
      </header>

      <div className="space-y-6">
        {/* Appearance */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <Moon className="text-slate-400" size={20} />
            <h3 className="font-semibold">Appearance</h3>
          </div>

          <div className="p-6 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400">
              Dark Mode
            </span>

            <button
              onClick={() =>
                setTheme(theme === "light" ? "dark" : "light")
              }
              className={`w-14 h-8 rounded-full transition-all flex items-center px-1
                ${theme === "dark"
                  ? "bg-indigo-600 justify-end"
                  : "bg-slate-200 justify-start"
                }`}
              aria-label="Toggle dark mode"
            >
              <div className="w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center">
                {theme === "dark" ? (
                  <Moon size={12} className="text-indigo-600" />
                ) : (
                  <Sun size={12} className="text-amber-500" />
                )}
              </div>
            </button>
          </div>
        </section>

        {/* Privacy & Data */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <Shield className="text-slate-400" size={20} />
            <h3 className="font-semibold">Privacy & Data</h3>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Export Workspace</p>
                <p className="text-sm text-slate-500">
                  Download your data as a JSON file.
                </p>
              </div>
              <button
                onClick={onExport}
                className="p-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-lg transition-all"
                aria-label="Export data"
              >
                <Download size={20} />
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-6">
              <div className="space-y-1">
                <p className="font-medium text-red-500">
                  Clear All Data
                </p>
                <p className="text-sm text-slate-500">
                  Permanently delete all your entries and stats.
                </p>
              </div>
              <button
                onClick={onClearData}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-all"
                aria-label="Clear all data"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Privacy info */}
        <section className="bg-emerald-50 dark:bg-emerald-950/20 p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900/50 flex gap-4">
          <Info className="text-emerald-600 flex-shrink-0" />
          <div className="space-y-2">
            <h4 className="font-semibold text-emerald-900 dark:text-emerald-200 text-sm">
              Privacy First
            </h4>
            <p className="text-emerald-700 dark:text-emerald-300 text-xs leading-relaxed">
              Your data is stored locally in your browser. MindLog does not
              send your personal reflections to any server or third party.
              This is your private sanctuary.
            </p>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-6">
          <p className="text-slate-400 text-xs">
            MINDLOG v1.0.0 • Crafted for personal growth
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
