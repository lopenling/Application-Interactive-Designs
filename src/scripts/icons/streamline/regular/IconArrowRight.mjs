
export const IconArrowRight = ({
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
    }><defs></defs><title>arrow-right</title><path d="m0.75 12 22.5 0" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M12.75 22.5 23.25 12 12.75 1.5" fill-rule="evenodd" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg>
  `;
};
export const IconDataArrowRight = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  content: `<defs></defs><title>arrow-right</title><path d="m0.75 12 22.5 0" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M12.75 22.5 23.25 12 12.75 1.5" fill-rule="evenodd" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>`
};
