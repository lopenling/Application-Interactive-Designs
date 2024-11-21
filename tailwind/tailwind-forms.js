/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
import svgToDataUri from "mini-svg-data-uri";

export default {
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addBase, theme }) {
      addBase({
        '[type="text"], input:where(:not([type])), [type="email"], [type="url"], [type="password"], [type="number"], [type="date"], [type="datetime-local"], [type="month"], [type="search"], [type="tel"], [type="time"], [type="week"], [multiple], textarea, select':
          {
            "border-color": theme("colors.common.150"),
            "&:focus": {
              "--tw-ring-color": theme("colors.primary.650"),
              "border-color": theme("colors.primary.650"),
            },
          },
        "input::placeholder, textarea::placeholder": {
          color: theme("colors.common.350"),
        },
        select: {
          "background-image": `url("${svgToDataUri(`
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path 
                stroke="${theme("colors.common.300")}" 
                stroke-width="1.5" 
                d="M6 8l4 4 4-4"
              />
            </svg>
          `)}")`,
        },
        '[type="checkbox"], [type="radio"]': {
          color: theme("colors.primary.650"),
          borderColor: theme("colors.common.150"),
          "&:focus": {
            "--tw-ring-color": theme("colors.primary.650"),
            color: theme("colors.primary.650"),
          },
        },
        // '[type="checkbox"]:checked': {
        //   "background-image": `url("${svgToDataUri(`
        //     <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 16 16">
        //       <path
        //         d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"
        //       />
        //     </svg>
        //   `)}")`,
        // },
        // '[type="radio"]:checked': {
        //   "background-image": `url("${svgToDataUri(`
        //     <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 16 16">
        //       <circle cx="8" cy="8" r="3"/>
        //     </svg>
        //   `)}")`,
        // },
        // '[type="checkbox"]:indeterminate': {
        //   "background-image": `url("${svgToDataUri(`
        //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
        //       <path
        //         stroke="white"
        //         stroke-linecap="round"
        //         stroke-linejoin="round"
        //         stroke-width="2" d="M4 8h8"
        //       />
        //       </svg>
        //   `)}")`,
        // },
      });
    }),
  ],
};
