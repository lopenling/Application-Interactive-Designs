
export const IconBookBookPages = ({
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
    }><path d="M15.46875 20.168437500000003a1.40625 1.40625 0 0 1 -1.78125 1.3556249999999999L3.8437499999999996 18.789375A1.40625 1.40625 0 0 1 2.8125 17.4375V2.3315625a1.40625 1.40625 0 0 1 1.78125 -1.3556249999999999l9.84375 3.1790625a1.40625 1.40625 0 0 1 1.03125 1.3546875Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M4.21875 0.9253125h14.0625a1.40625 1.40625 0 0 1 1.40625 1.40625v14.765625a1.40625 1.40625 0 0 1 -1.40625 1.40625h-2.8125" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg>
  `;
};
export const IconDataBookBookPages = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "-0.75 -0.75 24 24",
  content: `<path d="M15.46875 20.168437500000003a1.40625 1.40625 0 0 1 -1.78125 1.3556249999999999L3.8437499999999996 18.789375A1.40625 1.40625 0 0 1 2.8125 17.4375V2.3315625a1.40625 1.40625 0 0 1 1.78125 -1.3556249999999999l9.84375 3.1790625a1.40625 1.40625 0 0 1 1.03125 1.3546875Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M4.21875 0.9253125h14.0625a1.40625 1.40625 0 0 1 1.40625 1.40625v14.765625a1.40625 1.40625 0 0 1 -1.40625 1.40625h-2.8125" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>`
};
