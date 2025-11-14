import { useRef, useEffect, useCallback } from 'react';

type DebounceFunction<T extends (...args: unknown[]) => void> = (
  ...args: Parameters<T>
) => void;

function useDebounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): [DebounceFunction<T>, () => void] {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fnRef = useRef(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const debounced = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        fnRef.current(...args);
      }, delay);
    },
    [delay]
  );

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return [debounced, cancel];
}

export default useDebounce;
