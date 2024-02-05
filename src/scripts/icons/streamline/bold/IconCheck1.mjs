
export const IconCheck1 = ({
  fill = "currentColor",
  stroke = "none",
  className = "",
  ariaHidden = "true",
} = {}) => {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ${
      (fill ? ` fill="${fill}"` : "") +
      (stroke ? ` stroke="${stroke}"` : "") +
      (className ? ` class="${className}"` : "") +
      (ariaHidden ? ` aria-hidden="${ariaHidden}"` : "")
    }><path d="M23.37 0.29a1.49 1.49 0 0 0 -2.09 0.34L7.25 20.2l-4.69 -4.69a1.5 1.5 0 0 0 -2.12 2.12l5.93 5.94a1.53 1.53 0 0 0 2.28 -0.19l15.07 -21a1.49 1.49 0 0 0 -0.35 -2.09Z" fill="currentcolor" stroke-width="1"></path></svg>
  `;
};
export const IconDataCheck1 = {
  fill: "currentColor",
  stroke: "none",
  viewBox: "0 0 24 24",
  content: `<path d="M23.37 0.29a1.49 1.49 0 0 0 -2.09 0.34L7.25 20.2l-4.69 -4.69a1.5 1.5 0 0 0 -2.12 2.12l5.93 5.94a1.53 1.53 0 0 0 2.28 -0.19l15.07 -21a1.49 1.49 0 0 0 -0.35 -2.09Z" fill="currentcolor" stroke-width="1"></path>`
};
