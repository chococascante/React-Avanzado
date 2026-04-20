'use client';

import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from 'react';

type Theme = 'light' | 'dark';

interface ThemeStateValue {
  theme: Theme;
}

interface ThemeDispatchValue {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeStateContext = createContext<ThemeStateValue | null>(null);
const ThemeDispatchContext = createContext<ThemeDispatchValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const stateValue = useMemo<ThemeStateValue>(() => ({ theme }), [theme]);

  const dispatchValue = useMemo<ThemeDispatchValue>(
    () => ({
      setTheme,
      toggleTheme: () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    []
  );

  return (
    <ThemeStateContext.Provider value={stateValue}>
      <ThemeDispatchContext.Provider value={dispatchValue}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeStateContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export function useThemeActions() {
  const ctx = useContext(ThemeDispatchContext);
  if (!ctx) throw new Error('useThemeActions must be used within ThemeProvider');
  return ctx;
}
