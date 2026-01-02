import React from 'react';

interface MoodSelectorProps {
  value?: number;
  onChange: (mood: number) => void;
}

const MOODS = Array.from({ length: 10 }, (_, i) => i + 1);

const MoodSelector: React.FC<MoodSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-slate-600 dark:text-slate-400">
        How are you feeling today? <span className="text-xs">(1–10)</span>
      </label>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {MOODS.map((num) => {
          const isActive = value === num;

          return (
            <button
              key={num}
              type="button"
              onClick={() => onChange(num)}
              aria-pressed={isActive}
              className={`
                flex-shrink-0 w-10 h-10 rounded-full
                flex items-center justify-center
                text-sm font-semibold border transition-all
                focus:outline-none focus:ring-2 focus:ring-indigo-400
                ${isActive
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-400'
                }
              `}
            >
              {num}
            </button>
          );
        })}
      </div>

      {value && (
        <p className="text-xs text-slate-500 italic">
          Selected mood: <span className="font-semibold text-indigo-500">{value}</span>
        </p>
      )}
    </div>
  );
};

export default MoodSelector;

