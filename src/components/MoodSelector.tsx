
import React from 'react';

interface MoodSelectorProps {
  value?: number;
  onChange: (mood: number) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-slate-600 dark:text-slate-400 block">How are you feeling today? (1-10)</label>
      <div className="flex justify-between items-center gap-2 overflow-x-auto pb-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <button
            key={num}
            onClick={() => onChange(num)}
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all border ${
              value === num
                ? 'bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-200 dark:shadow-none'
                : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-indigo-300'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
