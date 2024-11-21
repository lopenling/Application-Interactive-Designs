/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  corePlugins: {
    container: false,
  },
  plugins: [
    plugin(function ({ matchComponents, theme }) {
      matchComponents(
        {
          container: (value) => ({
            width: "100%",
            maxWidth: `calc(${value} + (var(--container-padding-x, 0) * 2))`,
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "var(--container-padding-x, 0)",
            paddingRight: "var(--container-padding-x, 0)",
          }),
        },
        { values: theme("container") },
      );
    }),
  ],
  theme: {
    extend: {
      container: {
        DEFAULT: "100%",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
};
