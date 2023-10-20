
export const IconArrowUp1 = ({
  fill = "none",
  stroke = "currentColor",
  className = "",
  ariaHidden = "true",
} = {}) => {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.75 -0.75 24 24" ${
      (fill ? ` fill="${fill}"` : "") +
      (stroke ? ` stroke="${stroke}"` : "") +
      (className ? ` class="${className}"` : "") +
      (ariaHidden ? ` aria-hidden="${ariaHidden}"` : "")
    }><path d="M0.703125 16.1146875 10.753125 6.065625a0.7021875 0.7021875 0 0 1 0.99375 0l10.05 10.0490625" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg>
  `;
};
export const IconDataArrowUp1 = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "-0.75 -0.75 24 24",
  content: `<path d="M0.703125 16.1146875 10.753125 6.065625a0.7021875 0.7021875 0 0 1 0.99375 0l10.05 10.0490625" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>`
};
