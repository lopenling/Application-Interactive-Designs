/**
 * Retrieves the visual viewport height, appends `px`, and sets it as the value
 * of the `--visual-viewport-height` CSS variable on the :root element.
 * Removes the CSS variable if the `remove` argument is `true`.
 */
export default function visualViewportHeightCssVar({ remove = false } = {}): void {
  const rootStyle = document.documentElement.style;

  if (remove) {
    rootStyle.removeProperty("--visual-viewport-height");
    return;
  }

  if (window.visualViewport) {
    const height = Math.round(window.visualViewport.height);
    rootStyle.setProperty("--visual-viewport-height", `${height}px`);
  }
}
