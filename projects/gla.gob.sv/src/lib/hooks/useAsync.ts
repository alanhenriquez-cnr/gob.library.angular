import { signal } from '@angular/core';

export function useAsync<T, Args extends any[] = any[]>(
  asyncFn: (...args: Args) => Promise<T>
) {
  const loading = signal(false);
  const data = signal<T | null>(null);
  const error = signal<any>(null);

  async function run(...args: Args) {
    loading.set(true);
    error.set(null);
    try {
      const result = await asyncFn(...args);
      data.set(result);
      return result;
    } catch (err) {
      error.set(err);
      return null;
    } finally {
      loading.set(false);
    }
  }

  return { loading, data, error, run };
} 