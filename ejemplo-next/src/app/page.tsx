import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <h2 className="text-3xl font-bold text-gray-900">Bienvenido a TaskFlow</h2>
      <p className="max-w-md text-gray-500">
        Aplicación de referencia del curso React Avanzado. Construida con Next.js App Router,
        feature-based architecture y hooks personalizados.
      </p>
      <Link
        href="/tasks"
        className="rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
      >
        Ver tareas →
      </Link>
    </div>
  );
}
