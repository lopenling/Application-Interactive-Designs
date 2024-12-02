/**
 * Checks if the body is scrollable and sets the `--is-body-scrollable` CSS
 * variable to `1` or `0` accordingly on the :root element.
 */
export default function isBodyScrollableCssVar(): void {
  let isScrollable = 0;
  if (document.body.getBoundingClientRect().height > window.innerHeight) {
    isScrollable = 1;
  }
  document.documentElement.style.setProperty("--is-body-scrollable", `${isScrollable}`);
}
