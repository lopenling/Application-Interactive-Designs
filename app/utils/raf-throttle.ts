/**
 * Throttles a function to only execute at most once per animation frame.
 *
 * @param callback - The function to throttle.
 * @returns A throttled version of the callback function that executes at most
 * once per animation frame.
 */
export default function rafThrottle(callback: Function) {
  let requestID: number;

  return function (this: any, ...args: any[]) {
    cancelAnimationFrame(requestID);

    requestID = requestAnimationFrame(() => {
      callback.apply(this, args);
    });
  };
}
