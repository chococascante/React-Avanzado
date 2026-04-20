'use client';

import type { TaskFilter } from '@/hooks/useTasks';

interface FilterOption {
  value: TaskFilter;
  label: string;
}

const filters: FilterOption[] = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendientes' },
  { value: 'completed', label: 'Completadas' },
  { value: 'todo', label: 'Por hacer' },
  { value: 'in_progress', label: 'En progreso' },
];

interface TaskFiltersProps {
  activeFilter: TaskFilter;
  onFilterChange: (value: TaskFilter) => void;
}

export function TaskFilters({ activeFilter, onFilterChange }: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => {
        const isActive = activeFilter === f.value;
        return (
          <button
            key={f.value}
            type="button"
            onClick={() => onFilterChange(f.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
