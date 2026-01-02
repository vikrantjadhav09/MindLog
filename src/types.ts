export enum EntryType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

export type MoodLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface Entry {
  id: string;
  type: EntryType;

  /** Reflection target date (ISO) */
  date: string;

  mood?: MoodLevel;

  /** QuestionId -> Answer */
  responses: Record<string, string>;

  /** Optional numeric self-ratings */
  ratings?: Record<string, number>;

  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export interface UserStats {
  currentStreak: number;
  longestStreak: number;
  totalEntries: number;
  lastEntryDate?: string;
}

export interface AppState {
  entries: Entry[];
  stats: UserStats;
  theme: 'light' | 'dark';
}
