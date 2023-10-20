
export const IconArrowDown1 = ({
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
    }><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M21.796875 6.8540624999999995 11.746875 16.903125000000003a0.7021875 0.7021875 0 0 1 -0.99375 0L0.703125 6.8540624999999995" stroke-width="1.5"></path></svg>
  `;
};
export const IconDataArrowDown1 = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "-0.75 -0.75 24 24",
  content: `<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M21.796875 6.8540624999999995 11.746875 16.903125000000003a0.7021875 0.7021875 0 0 1 -0.99375 0L0.703125 6.8540624999999995" stroke-width="1.5"></path>`
};
