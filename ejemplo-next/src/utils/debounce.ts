export function debounce<A extends unknown[], R>(
  callback: (...args: A) => R,
  time: number,
) {
  let timerId: ReturnType<typeof setTimeout>;
  let result: R;
  return (...args: A): R => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      result = callback(...args);
    }, time);

    return result;
  };
}
