'use client';

import { Button } from '@/shared/ui/atoms/Button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
      <p className="mb-4 text-sm font-medium text-red-700">{message}</p>
      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry}>
          Reintentar
        </Button>
      )}
    </div>
  );
}
