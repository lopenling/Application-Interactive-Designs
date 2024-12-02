/** @type {import('tailwindcss').Config} */

export default {
  plugins: [require("@tailwindcss/aspect-ratio"), require("@headlessui/tailwindcss")],
  theme: {
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
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      borderColor: ({ theme }) => ({
        DEFAULT: theme("colors.common.100", "currentColor"),
      }),
      borderRadius: {
        px: "1px",
        xs: "0.125rem",
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        none: "none",
      },
      fontFamily: {
        sans: ["Noto Sans", "sans-serif"],
        serif: ["Noto Serif", "serif"],
        tibetan: ["Noto Serif Tibetan", "serif"],
      },
      outlineColor: ({ theme }) => ({
        DEFAULT: theme("colors.primary.650", "currentColor"),
      }),
      outlineWidth: {
        DEFAULT: "2px",
      },
      ringColor: ({ theme }) => ({
        DEFAULT: theme("colors.primary.650", "currentColor"),
      }),
      ringOpacity: {
        DEFAULT: "1",
      },
      ringWidth: {
        DEFAULT: "2px",
      },
      transitionDuration: {
        DEFAULT: "125ms",
      },
    },
  },
};
