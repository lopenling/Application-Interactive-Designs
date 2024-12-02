/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("mouse", "@media (hover: hover) and (pointer: fine)");
    }),
  ],
  theme: {
    colors: {
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
      black: "#000",
      white: "#fff",
    },
    screens: {
      "2xs": "375px",
      xs: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  presets: [
    require("./tailwind/tailwind-colors.js"),
    require("./tailwind/tailwind-general.js"),
    require("./tailwind/tailwind-container.js"),
    require("./tailwind/tailwind-font-sizes.js"),
    require("./tailwind/tailwind-typography.js"),
    require("./tailwind/tailwind-forms.js"),
  ],
};
