'use client';

import { Button } from '@/shared/ui/atoms/Button';
import { Card } from '@/shared/ui/molecules/Card';
import { useForm } from '@/hooks/useForm';
import type { Task, TaskPriority } from '../data/mockData';

interface TaskFormValues extends Record<string, unknown> {
  title: string;
  description: string;
  priority: TaskPriority;
  project: string;
}

interface TaskFormProps {
  onSubmit: (data: Omit<Task, 'id' | 'createdAt' | 'completed' | 'status'>) => void;
  isLoading?: boolean;
}

export function TaskForm({ onSubmit, isLoading = false }: TaskFormProps) {
  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm<TaskFormValues>({
    initialValues: {
      title: '',
      description: '',
      priority: 'medium',
      project: 'TaskFlow UI',
    },
    validate: (v) => {
      const errs: Record<string, string> = {};
      if (!v.title.trim()) errs.title = 'El título es requerido';
      else if (v.title.length < 3) errs.title = 'Mínimo 3 caracteres';
      return errs;
    },
    onSubmit: (v) => {
      onSubmit({
        title: v.title,
        description: v.description,
        priority: v.priority,
        project: v.project,
      });
    },
  });

  const busy = isLoading || isSubmitting;

  return (
    <Card className="mb-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Nueva tarea</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
            Título *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={values.title}
            onChange={handleChange}
            placeholder="Escribe el título..."
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={values.description}
            onChange={handleChange}
            placeholder="Detalles (opcional)"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="priority" className="mb-1 block text-sm font-medium text-gray-700">
              Prioridad
            </label>
            <select
              id="priority"
              name="priority"
              value={values.priority}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div>
            <label htmlFor="project" className="mb-1 block text-sm font-medium text-gray-700">
              Proyecto
            </label>
            <input
              id="project"
              name="project"
              type="text"
              value={values.project}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}

        <div className="flex justify-end">
          <Button type="submit" disabled={busy}>
            {busy ? 'Creando...' : 'Crear tarea'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
