'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * useAsync — ejecuta una función async con AbortController para
 * cancelar cuando el componente se desmonta o la función cambia.
 */
export function useAsync<T>(
  asyncFn: (signal: AbortSignal) => Promise<T>,
  immediate: boolean = true
): AsyncState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: immediate,
    error: null,
  });

  const controllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  const execute = useCallback(async () => {
    if (controllerRef.current) controllerRef.current.abort();
    controllerRef.current = new AbortController();

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await asyncFn(controllerRef.current.signal);
      if (isMountedRef.current) {
        setState({ data: result, isLoading: false, error: null });
      }
    } catch (err) {
      const error = err as Error;
      if (error.name !== 'AbortError' && isMountedRef.current) {
        setState({ data: null, isLoading: false, error });
      }
    }
  }, [asyncFn]);

  useEffect(() => {
    isMountedRef.current = true;
    if (immediate) execute();

    return () => {
      isMountedRef.current = false;
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [execute, immediate]);

  return { ...state, refetch: execute };
}
