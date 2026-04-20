import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { AppProviders } from '@/contexts/AppProviders';

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'Gestión de tareas profesional — Curso React Avanzado CENFOTEC',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <AppProviders>
          <header className="border-b border-gray-200 bg-white">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
              <Link href="/" className="text-xl font-bold text-gray-900">
                TaskFlow
              </Link>
              <nav className="flex items-center gap-4 text-sm font-medium text-gray-600">
                <Link href="/" className="hover:text-gray-900">
                  Inicio
                </Link>
                <Link href="/tasks" className="hover:text-gray-900">
                  Tareas
                </Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
