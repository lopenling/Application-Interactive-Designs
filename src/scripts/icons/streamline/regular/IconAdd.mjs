
export const IconAdd = ({
  fill = "none",
  stroke = "currentColor",
  className = "",
  ariaHidden = "true",
} = {}) => {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ${
      (fill ? ` fill="${fill}"` : "") +
      (stroke ? ` stroke="${stroke}"` : "") +
      (className ? ` class="${className}"` : "") +
      (ariaHidden ? ` aria-hidden="${ariaHidden}"` : "")
    }><defs></defs><title>add</title><path d="m0.75 12 22.5 0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="m12 0.75 0 22.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg>
  `;
};
export const IconDataAdd = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  content: `<defs></defs><title>add</title><path d="m0.75 12 22.5 0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="m12 0.75 0 22.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>`
};
