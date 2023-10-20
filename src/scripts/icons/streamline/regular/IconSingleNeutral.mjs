
export const IconSingleNeutral = ({
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
    }><path d="M6.328125 5.625a4.921875 4.921875 0 1 0 9.84375 0 4.921875 4.921875 0 1 0 -9.84375 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M2.109375 21.796875a9.140625 9.140625 0 0 1 18.28125 0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg>
  `;
};
export const IconDataSingleNeutral = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "-0.75 -0.75 24 24",
  content: `<path d="M6.328125 5.625a4.921875 4.921875 0 1 0 9.84375 0 4.921875 4.921875 0 1 0 -9.84375 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M2.109375 21.796875a9.140625 9.140625 0 0 1 18.28125 0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>`
};
