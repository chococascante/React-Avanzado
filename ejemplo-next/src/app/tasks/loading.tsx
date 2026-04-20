import { LoadingSkeleton } from '@/features/tasks/components/LoadingSkeleton';

export default function TasksLoading() {
  return (
    <div>
      <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-200" />
      <LoadingSkeleton count={6} />
    </div>
  );
}
