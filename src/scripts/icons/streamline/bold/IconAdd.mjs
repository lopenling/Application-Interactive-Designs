
export const IconAdd = ({
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
    }><path d="M0 12a1.5 1.5 0 0 0 1.5 1.5h8.75a0.25 0.25 0 0 1 0.25 0.25v8.75a1.5 1.5 0 0 0 3 0v-8.75a0.25 0.25 0 0 1 0.25 -0.25h8.75a1.5 1.5 0 0 0 0 -3h-8.75a0.25 0.25 0 0 1 -0.25 -0.25V1.5a1.5 1.5 0 0 0 -3 0v8.75a0.25 0.25 0 0 1 -0.25 0.25H1.5A1.5 1.5 0 0 0 0 12Z" fill="currentColor" stroke-width="1"></path></svg>
  `;
};
export const IconDataAdd = {
  fill: "currentColor",
  stroke: "none",
  viewBox: "0 0 24 24",
  content: `<path d="M0 12a1.5 1.5 0 0 0 1.5 1.5h8.75a0.25 0.25 0 0 1 0.25 0.25v8.75a1.5 1.5 0 0 0 3 0v-8.75a0.25 0.25 0 0 1 0.25 -0.25h8.75a1.5 1.5 0 0 0 0 -3h-8.75a0.25 0.25 0 0 1 -0.25 -0.25V1.5a1.5 1.5 0 0 0 -3 0v8.75a0.25 0.25 0 0 1 -0.25 0.25H1.5A1.5 1.5 0 0 0 0 12Z" fill="currentColor" stroke-width="1"></path>`
};
