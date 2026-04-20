'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from './ThemeContext';
import { NotificationProvider } from './NotificationContext';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </ThemeProvider>
  );
}
