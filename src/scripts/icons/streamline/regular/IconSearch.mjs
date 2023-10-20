
export const IconSearch = ({
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
    }><path d="M1.38 12.5221875a8.496562500000001 8.496562500000001 0 1 0 15.639375 -6.646875 8.496562500000001 8.496562500000001 0 1 0 -15.639375 6.646875Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="m15.2071875 15.206249999999999 6.5896875 6.590625" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg>
  `;
};
export const IconDataSearch = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "-0.75 -0.75 24 24",
  content: `<path d="M1.38 12.5221875a8.496562500000001 8.496562500000001 0 1 0 15.639375 -6.646875 8.496562500000001 8.496562500000001 0 1 0 -15.639375 6.646875Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="m15.2071875 15.206249999999999 6.5896875 6.590625" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>`
};
