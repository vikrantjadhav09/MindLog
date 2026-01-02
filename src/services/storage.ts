
import { Entry, AppState, EntryType, UserStats } from '../types';

const STORAGE_KEY = 'mindlog_state_v1';

const initialStats: UserStats = {
  currentStreak: 0,
  longestStreak: 0,
  totalEntries: 0
};

export const loadState = (): AppState => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return { entries: [], stats: initialStats, theme: 'light' };
  return JSON.parse(saved);
};

export const saveState = (state: AppState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const calculateStats = (entries: Entry[]): UserStats => {
  const dailyEntries = entries
    .filter(e => e.type === EntryType.DAILY)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (dailyEntries.length === 0) return initialStats;

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const dates = dailyEntries.map(e => new Date(e.date).toDateString());
  const uniqueDates = Array.from(new Set(dates));

  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  // Current Streak Calculation
  let lastDate = new Date();
  if (uniqueDates[0] === today || uniqueDates[0] === yesterday) {
    for (let i = 0; i < uniqueDates.length; i++) {
      const d = new Date(uniqueDates[i]);
      const diff = Math.floor((new Date(uniqueDates[0]).getTime() - d.getTime()) / 86400000);
      if (diff === i) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // Longest Streak Calculation
  for (let i = 0; i < uniqueDates.length; i++) {
    if (i > 0) {
      const d1 = new Date(uniqueDates[i - 1]);
      const d2 = new Date(uniqueDates[i]);
      const diff = Math.floor((d1.getTime() - d2.getTime()) / 86400000);

      if (diff === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak + 1);
        tempStreak = 0;
      }
    } else {
      tempStreak = 0;
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak + (uniqueDates.length > 0 ? 1 : 0));

  return {
    currentStreak,
    longestStreak,
    totalEntries: entries.length,
    lastEntryDate: uniqueDates[0]
  };
};
