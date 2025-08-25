import { useRef } from 'react';

interface DebounceFunction<T extends (...args: unknown[]) => void> {
  (...args: Parameters<T>): void;
}

interface UseDebounce {
  <T extends (...args: unknown[]) => void>(
    fn: T,
    delay: number
  ): DebounceFunction<T>;
}

const useDebounce: UseDebounce = function <
  T extends (...args: unknown[]) => void,
>(fn: T, delay: number): DebounceFunction<T> {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function debounceFn(...args: Parameters<T>): void {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  }

  return debounceFn;
};

export default useDebounce;
