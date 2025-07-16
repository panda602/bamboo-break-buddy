export interface DailyEntry {
  date: string;
  cigarettes: number;
  vapes: number;
  timestamp: number;
}

export interface UserGoal {
  type: 'cigarettes' | 'vapes' | 'both';
  targetPerDay: number;
  startDate: string;
  description: string;
}

const STORAGE_KEYS = {
  DAILY_ENTRIES: 'panda-quit-entries',
  USER_GOAL: 'panda-quit-goal',
  LAST_MOTIVATION_DATE: 'panda-quit-last-motivation'
};

export const storageUtils = {
  // Daily entries
  saveEntry: (entry: DailyEntry): void => {
    const entries = storageUtils.getEntries();
    const existingIndex = entries.findIndex(e => e.date === entry.date);
    
    if (existingIndex >= 0) {
      entries[existingIndex] = entry;
    } else {
      entries.push(entry);
    }
    
    // Keep only last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const filteredEntries = entries.filter(e => new Date(e.date) >= thirtyDaysAgo);
    
    localStorage.setItem(STORAGE_KEYS.DAILY_ENTRIES, JSON.stringify(filteredEntries));
  },

  getEntries: (): DailyEntry[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.DAILY_ENTRIES);
    return stored ? JSON.parse(stored) : [];
  },

  getEntryByDate: (date: string): DailyEntry | null => {
    const entries = storageUtils.getEntries();
    return entries.find(e => e.date === date) || null;
  },

  getLast7Days: (): DailyEntry[] => {
    const entries = storageUtils.getEntries();
    const last7Days: DailyEntry[] = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const entry = entries.find(e => e.date === dateString);
      last7Days.push(entry || { date: dateString, cigarettes: 0, vapes: 0, timestamp: 0 });
    }
    
    return last7Days;
  },

  // User goals
  saveGoal: (goal: UserGoal): void => {
    localStorage.setItem(STORAGE_KEYS.USER_GOAL, JSON.stringify(goal));
  },

  getGoal: (): UserGoal | null => {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_GOAL);
    return stored ? JSON.parse(stored) : null;
  },

  // Motivation tracking
  setLastMotivationDate: (date: string): void => {
    localStorage.setItem(STORAGE_KEYS.LAST_MOTIVATION_DATE, date);
  },

  getLastMotivationDate: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.LAST_MOTIVATION_DATE);
  }
};

export const dateUtils = {
  formatDate: (date: Date): string => {
    return date.toISOString().split('T')[0];
  },

  formatDisplayDate: (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  getDayName: (date: Date): string => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  },

  isToday: (date: string): boolean => {
    const today = new Date();
    return date === dateUtils.formatDate(today);
  }
};
