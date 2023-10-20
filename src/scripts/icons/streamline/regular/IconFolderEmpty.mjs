
export const IconFolderEmpty = ({
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
    }><path d="M18.984375 9.140625v-2.8125a1.40625 1.40625 0 0 0 -1.40625 -1.40625H7.734375v-1.40625a1.40625 1.40625 0 0 0 -1.40625 -1.40625h-4.21875a1.40625 1.40625 0 0 0 -1.40625 1.40625v15.28125a1.59375 1.59375 0 0 0 3.1275 0.410625l2.2040625 -9.0534375A1.40625 1.40625 0 0 1 7.386562499999999 9.140625H20.390625a1.40625 1.40625 0 0 1 1.359375 1.768125l-2.0625 8.4375a1.40625 1.40625 0 0 1 -1.359375 1.044375H2.2940625" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg>
  `;
};
export const IconDataFolderEmpty = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "-0.75 -0.75 24 24",
  content: `<path d="M18.984375 9.140625v-2.8125a1.40625 1.40625 0 0 0 -1.40625 -1.40625H7.734375v-1.40625a1.40625 1.40625 0 0 0 -1.40625 -1.40625h-4.21875a1.40625 1.40625 0 0 0 -1.40625 1.40625v15.28125a1.59375 1.59375 0 0 0 3.1275 0.410625l2.2040625 -9.0534375A1.40625 1.40625 0 0 1 7.386562499999999 9.140625H20.390625a1.40625 1.40625 0 0 1 1.359375 1.768125l-2.0625 8.4375a1.40625 1.40625 0 0 1 -1.359375 1.044375H2.2940625" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>`
};
