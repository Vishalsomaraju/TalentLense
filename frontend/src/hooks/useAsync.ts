/**
 * @module hooks/useAsync
 * @description Generic hook for managing loading, error, and data state.
 * Eliminates boilerplate of writing isLoading/error/data state per component.
 *
 * @example
 * const { isLoading, error, data, execute } = useAsync<User[]>();
 * await execute(() => userService.fetchAll());
 *
 * @version 1.0.0
 */
import { useState, useCallback } from 'react';
import type { ApiResponse } from '@/types';

interface AsyncState<T> {
  isLoading: boolean;
  error: string | null;
  data: T | null;
}

interface UseAsyncReturn<T> extends AsyncState<T> {
  execute: (fn: () => Promise<ApiResponse<T>>) => Promise<ApiResponse<T>>;
  reset: () => void;
}

const INITIAL: AsyncState<never> = { isLoading: false, error: null, data: null };

export function useAsync<T>(): UseAsyncReturn<T> {
  const [state, setState] = useState<AsyncState<T>>(INITIAL as AsyncState<T>);

  const execute = useCallback(
    async (fn: () => Promise<ApiResponse<T>>): Promise<ApiResponse<T>> => {
      setState({ isLoading: true, error: null, data: null });
      const result = await fn();
      if (result.error) {
        setState({ isLoading: false, error: result.error, data: null });
      } else {
        setState({ isLoading: false, error: null, data: result.data });
      }
      return result;
    },
    []
  );

  const reset = useCallback(() => setState(INITIAL as AsyncState<T>), []);

  return { ...state, execute, reset };
}
