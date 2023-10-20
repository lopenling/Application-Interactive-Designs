
export const IconCheck1 = ({
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
    }><path d="M21.796875 0.7021875 7.648124999999999 20.91375a2.0625 2.0625 0 0 1 -3.3459375 0.0553125L0.703125 16.170937499999997" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg>
  `;
};
export const IconDataCheck1 = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "-0.75 -0.75 24 24",
  content: `<path d="M21.796875 0.7021875 7.648124999999999 20.91375a2.0625 2.0625 0 0 1 -3.3459375 0.0553125L0.703125 16.170937499999997" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>`
};
