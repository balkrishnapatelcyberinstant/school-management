'use client';

import useSWR, { type SWRConfiguration } from 'swr';
import { useState } from 'react';
import type { ApiResponse } from '../api/types';

/**
 * Generic hook for GET requests with SWR
 */
export function useApi<T>(
  key: string | null,
  fetcher: () => Promise<ApiResponse<T>>,
  options?: SWRConfiguration
) {
  const { data, error, isLoading, mutate } = useSWR(
    key,
    async () => {
      const response = await fetcher();
      return response.data;
    },
    {
      revalidateOnFocus: false,
      ...options,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}

/**
 * Hook for mutations (POST, PUT, DELETE)
 */
export function useMutation<TData, TVariables = any>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const mutate = async (
    mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>
  ) => {
    return async (variables: TVariables) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await mutationFn(variables);
        return response.data;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    };
  };

  return {
    mutate,
    isLoading,
    error,
  };
}
