/**
 * Checks if the referenced DOM element is scrollable and sets the 
 * `--is-<name>-scrollable` CSS variable to `1` or `0` accordingly on the 
 * :root element.
 * 
 * @param {HTMLElement} element - The DOM element to check for scrollability, 
 * passed as `elementRef.value`
 * @param {string} name - The name to use in the CSS variable.

 */
export default function isElementScrollableCssVar(element: HTMLElement | null, name: string): void {
  if (element === null) return;

  let isScrollable = 0;
  if (element.scrollHeight > element.clientHeight) {
    isScrollable = 1;
  }
  document.documentElement.style.setProperty(`--is-${name}-scrollable`, `${isScrollable}`);
}
