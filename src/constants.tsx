
import { EntryType } from './types';

export const QUESTIONS: Record<EntryType, { id: string; label: string; placeholder: string }[]> = {
  [EntryType.DAILY]: [
    { id: 'did', label: 'Today I did...', placeholder: 'What were your main activities?' },
    { id: 'learned', label: 'Today I learned...', placeholder: 'Did you discover something new?' },
    { id: 'good', label: 'One good thing from today', placeholder: 'Focus on a positive moment.' },
    { id: 'tomorrow', label: 'Tomorrow\'s most important task', placeholder: 'What is the priority for tomorrow?' },
  ],
  [EntryType.WEEKLY]: [
    { id: 'well', label: 'What went well this week?', placeholder: 'Reflect on successes...' },
    { id: 'notWell', label: 'What didn\'t go well?', placeholder: 'Be honest but kind to yourself...' },
    { id: 'learned', label: 'What did I learn?', placeholder: 'New skills or realizations?' },
    { id: 'distraction', label: 'Biggest distraction this week', placeholder: 'What took your focus away?' },
    { id: 'win', label: 'Biggest win of the week', placeholder: 'Highlight your best moment.' },
    { id: 'priorities', label: 'Top 3 priorities for next week', placeholder: '1. ...\n2. ...\n3. ...' },
  ],
  [EntryType.MONTHLY]: [
    { id: 'focus', label: 'Areas I focused on (skill, health, money, mind)', placeholder: 'Where did your energy go?' },
    { id: 'wins', label: 'Top 5 wins of the month', placeholder: 'Celebrate your progress...' },
    { id: 'mistakes', label: 'Biggest mistakes or weak areas', placeholder: 'Growth opportunities...' },
    { id: 'lessons', label: 'Lessons learned about myself', placeholder: 'Self-discovery highlights...' },
    { id: 'distractions', label: 'Distractions and time-wasters', placeholder: 'What to avoid next month?' },
    { id: 'goals', label: 'Top 3 goals for next month', placeholder: 'Strategic focus for next month...' },
    { id: 'habits', label: 'Non-negotiable habits for next month', placeholder: 'What will you stick to?' },
    { id: 'message', label: 'One message to myself', placeholder: 'A kind note for the future you...' },
  ],
  [EntryType.YEARLY]: [
    { id: 'starting', label: 'Starting point of the year', placeholder: 'Career, money, health, mindset at Jan 1st...' },
    { id: 'achievements', label: 'Achievements (big and small)', placeholder: 'List what you are proud of...' },
    { id: 'memories', label: 'Top 10 memories', placeholder: 'Moments you want to cherish...' },
    { id: 'struggles', label: 'Biggest struggles and how they were handled', placeholder: 'Your resilience in action...' },
    { id: 'mistakes', label: 'Biggest mistakes and lessons', placeholder: 'Turning points...' },
    { id: 'strengths', label: 'Strengths discovered', placeholder: 'What did you find out you are good at?' },
    { id: 'weaknesses', label: 'Weaknesses noticed', placeholder: 'Areas needing support...' },
    { id: 'patterns', label: 'Patterns in behavior', placeholder: 'Things you noticed repeating...' },
    { id: 'letGo', label: 'Things to let go', placeholder: 'Habits, people, thoughts to leave behind...' },
    { id: 'intentions', label: 'Intentions for next year', placeholder: 'The theme for your next year...' },
    { id: 'letter', label: 'A long letter to future self', placeholder: 'Write your heart out...' },
  ],
};

export const RATINGS: Record<string, string[]> = {
  [EntryType.WEEKLY]: ['Effort', 'Discipline', 'Mindset'],
  [EntryType.MONTHLY]: ['Discipline', 'Focus', 'Happiness', 'Consistency'],
};
