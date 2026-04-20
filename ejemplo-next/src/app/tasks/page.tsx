import type { Metadata } from 'next';
import { TaskListContainer } from '@/features/tasks/components/TaskListContainer';
import { mockTasks } from '@/features/tasks/data/mockData';

export const metadata: Metadata = {
  title: 'Tareas | TaskFlow',
};

export default function TasksPage() {
  // Server Component: en un proyecto real aquí se haría fetch a la DB.
  // Por ahora pasamos mockTasks como initialTasks.
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Mis tareas</h2>
      <TaskListContainer initialTasks={mockTasks} />
    </div>
  );
}
