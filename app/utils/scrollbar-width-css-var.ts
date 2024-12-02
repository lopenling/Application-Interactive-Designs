/**
 * Measures the scrollbar width, appends `px`, and sets it as the value of the
 * `--scrollbar-width` CSS variable on the :root element.
 */
export default function scrollbarWidthCssVar(): void {
  const scrollDiv = document.createElement("div");
  Object.assign(scrollDiv.style, {
    width: "100px",
    height: "100px",
    overflow: "scroll",
    position: "absolute",
    top: "-9999px",
    left: "-9999px",
  });

  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);

  document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
}
