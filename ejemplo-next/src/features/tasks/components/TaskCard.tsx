import { Badge } from '@/shared/ui/atoms/Badge';
import { Card } from '@/shared/ui/molecules/Card';
import type { Task, TaskPriority } from '../data/mockData';

const priorityColors: Record<TaskPriority, string> = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#22c55e',
};

const statusLabels: Record<string, string> = {
  todo: 'Por hacer',
  in_progress: 'En progreso',
  done: 'Completada',
};

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <Card onClick={onClick}>
      <Card.Header
        title={task.title}
        actions={<Badge label={task.priority} color={priorityColors[task.priority]} />}
      />
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <Badge label={statusLabels[task.status] ?? task.status} variant="outline" color="#6b7280" />
        <span className="text-xs text-gray-400">{task.project}</span>
      </div>
    </Card>
  );
}
