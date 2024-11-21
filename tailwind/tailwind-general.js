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
        none: "0px",
        sm: "1px",
        DEFAULT: "0.125rem",
        md: "0.25rem",
        lg: "0.375rem",
        xl: "0.5rem",
        "2xl": "0.75rem",
        "3xl": "1rem",
        full: "9999px",
      },
      boxShadow: {
        "lg+":
          "0 6px 6px -8px rgb(0 0 0 / 0.15), 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 25px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      fontFamily: {
        sans: ["Noto Sans", "sans-serif"],
        serif: ["Noto Serif", "serif"],
        tibetan: ["Noto Serif Tibetan", "serif"],
      },
      maxWidth: {
        test: "768px",
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
