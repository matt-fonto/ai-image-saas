export function debounce(cb: (...args: any[]) => void, delay: number) {
  let timeoutId: NodeJS.Timeout | null;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => cb.apply(null, args), delay);
  };
}
