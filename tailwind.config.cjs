const svgToDataUri = require("mini-svg-data-uri");
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

const customColors = {
  primary: {
    50: "#F5FAF5",
    100: "#EDF6EE",
    200: "#D6EAD7",
    300: "#BADCBB",
    400: "#77AF79",
    500: "#547C55",
    600: "#3E5B3F",
    700: "#2F4530",
    800: "#1C291D",
    900: "#121A12",
    950: "#070A07",
  },
  secondary: {
    50: "#F7FEE9",
    100: "#EDFBCF",
    200: "#DAF7A4",
    300: "#C0EF6F",
    400: "#A6E243",
    500: "#87C824",
    600: "#689F19",
    700: "#4F7917",
    800: "#416018",
    900: "#375119",
    950: "#1B2D08",
  },
};

module.exports = {
  content: ["./src/**/*.{astro,vue,html,js,mjs,cjs,ts,jsx,md,mdx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    extend: {
      animation: {
        "bounce-reverse": "bounce-reverse 1s infinite;",
      },
      keyframes: {
        "bounce-reverse": {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
          "50%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
        },
      },
      // backgroundImage: ({ theme }) => ({
      // }),
      borderColor: ({ theme }) => ({
        DEFAULT: theme("colors.stone.200", "currentColor"),
      }),
      borderRadius: {
        none: "0px",
        sm: "1px",
        DEFAULT: "0.125rem",
        md: "0.25rem",
        lg: "0.375rem",
        xl: "0.5rem",
        "2xl": "0.75rem",
        "3xl": "1rem",
      },
      // borderWidth: {
      // },
      // boxShadow: {
      // },
      colors: customColors,
      // dropShadow: {
      // },
      fontFamily: {
        sans: ["Noto Sans", ...defaultTheme.fontFamily.sans],
      },
      // fontSize: {
      // },
      // fontWeight: {
      // },
      // letterSpacing: {
      // },
      // lineHeight: {
      // },
      opacity: {
        5: "0.05",
        15: "0.15",
        25: "0.25",
        35: "0.35",
        45: "0.45",
        55: "0.55",
        65: "0.65",
        75: "0.75",
        85: "0.85",
        95: "0.95",
      },
      outlineColor: ({ theme }) => ({
        DEFAULT: theme("colors.primary.500", "currentColor"),
      }),
      // outlineOffset: {
      // },
      outlineWidth: {
        DEFAULT: "2px",
      },
      ringColor: ({ theme }) => ({
        DEFAULT: theme("colors.primary.500", "currentColor"),
      }),
      // ringOffsetWidth: {
      // },
      // ringOpacity: {
      // },
      // ringWidth: {
      // },
      // spacing: {
      // },
      transitionDuration: {
        DEFAULT: "125ms",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    require("@headlessui/tailwindcss"),

    // Overwrite @tailwindcss/forms base colors
    plugin(function ({ addBase, theme }) {
      addBase({
        '[type="text"], input:where(:not([type])), [type="email"], [type="url"], [type="password"], [type="number"], [type="date"],  [type="datetime-local"], [type="month"], [type="search"], [type="tel"], [type="time"], [type="week"], [multiple], textarea, select':
          {
            "&:focus": {
              "--tw-ring-color": theme("colors.primary.600"),
              "border-color": theme("colors.primary.600"),
            },
          },
        select: {
          "background-image": `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="${theme(
              "colors.stone.500",
            )}" stroke-width="1.5" d="M6 8l4 4 4-4"/></svg>`,
          )}")`,
        },
        '[type="checkbox"], [type="radio"]': {
          color: theme("colors.primary.600"),
        },
        '[type="checkbox"]:focus, [type="radio"]:focus': {
          color: theme("colors.primary.600"),
          "--tw-ring-color": theme("colors.primary.600"),
        },
      });
    }),
  ],
};
