/**
 * Throttles a function to only execute at most once every `delay` milliseconds.
 *
 * @param callback - The function to throttle.
 * @param delay - The delay in milliseconds between allowed calls.
 * @returns A throttled version of the callback function that executes at most
 * once every `delay` milliseconds.
 */
export default function throttle(callback: Function, delay: number) {
  let lastCall = 0;

  return function (this: any, ...args: any[]) {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      callback.apply(this, args);
    }
  };
}
