const svgToDataUri = require("mini-svg-data-uri");
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

const { default: toColorValue } = require("tailwindcss/lib/util/toColorValue");
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");
const { default: withAlphaVariable } = require("tailwindcss/lib/util/withAlphaVariable");

// Replicate helpers from @tailwindcss/typography
const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");
const rem = (px) => `${round(px / 16)}rem`;
const em = (px, base) => `${round(px / base)}em`;

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
    50: "#f5fbee",
    100: "#eef7df",
    200: "#d7edb5",
    300: "#badf81",
    400: "#78b220",
    500: "#557e17",
    600: "#3f5d11",
    700: "#30470d",
    800: "#1d2a08",
    900: "#121b05",
    950: "#070a02",
  },
};

// Overwrite @tailwindcss/typography base values
const customTypography = (theme) => ({
  DEFAULT: {
    css: {
      a: {
        display: "inline",
        margin: "0 -1px",
        padding: "0 1px",
        "text-decoration-thickness": "1px",
        "text-underline-offset": "3px",
        "text-decoration-color": theme("colors.secondary.400"),
        "transition-property": "text-decoration-color, color, background-color",
        "transition-duration": "150ms",
        "&:hover": {
          color: theme("colors.primary.800"),
          background: theme("colors.primary.100"),
        },
        "&:focus-visible": {
          "text-decoration": "none",
          "border-radius": "2px",
          color: theme("colors.primary.800"),
          background: theme("colors.primary.100"),
          "outline-width": "2px",
          "outline-color": theme("colors.primary.600"),
        },
      },
    },
  },

  sm: {
    css: {
      h1: {
        fontSize: em(28, 14),
        marginTop: "0",
        marginBottom: em(16, 28),
        lineHeight: round(34 / 28),
      },
      h3: {
        fontSize: em(16, 14),
        marginTop: em(24.8, 16),
        marginBottom: em(8, 16),
        lineHeight: round(24.8 / 16),
      },
    },
  },
  base: {
    css: {
      h1: {
        fontSize: em(34, 16),
        marginTop: "0",
        marginBottom: em(32, 34),
        lineHeight: round(40 / 34),
      },
      h3: {
        fontSize: em(18, 16),
        marginTop: em(28.8, 18),
        marginBottom: em(10.8, 18),
        lineHeight: round(28.8 / 18),
      },
    },
  },
  stone: {
    css: {
      "--tw-prose-body": theme("colors.stone.700"),
      "--tw-prose-bold": theme("colors.stone.800"),
      "--tw-prose-headings": theme("colors.stone.800"),
      "--tw-prose-links": theme("colors.stone.700"),
    },
  },
});

module.exports = {
  content: ["./src/**/*.{astro,vue,html,js,mjs,cjs,ts,jsx,md,mdx}"],
  theme: {
    screens: {
      "2xs": "375px",
      xs: "425px",
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
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
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
      boxShadow: {
        "lg+":
          "0 6px 6px -8px rgb(0 0 0 / 0.15), 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 25px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      colors: customColors,
      fontFamily: {
        sans: ["Noto Sans", ...defaultTheme.fontFamily.sans],
        serif: ["Noto Serif", ...defaultTheme.fontFamily.serif],
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
      spacing: {
        0.75: "0.1875rem",
      },
      transitionDuration: {
        DEFAULT: "125ms",
      },
      typography: customTypography,
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

    // tailwindcss-color-mix plugin by Javier Morales (JavierM42)
    plugin(({ matchUtilities, theme, corePlugins }) => {
      const { bgMix, bgMixAmount, bgMixMethod } = {
        bgMix: "bg-mix",
        bgMixAmount: "bg-mix-amount",
        bgMixMethod: "bg-mix-method",
      };
      // add bg-mix utility
      matchUtilities(
        {
          [bgMix]: (value) => {
            const { mixColor, ...rest } = withAlphaVariable({
              color: value,
              property: "mixColor",
              variable: "--tw-bg-mix-opacity",
            });

            return {
              ...rest,
              "background-color": `color-mix(var(--tw-bg-mix-method, in srgb), ${mixColor} calc(var(--tw-bg-mix-amount, 0) * 1%), var(--tw-bg-base))`,
            };
          },
        },
        {
          values: flattenColorPalette(theme("backgroundColor")),
          type: ["color", "any"],
        },
      );
      // add bg-mix-amount utility
      matchUtilities(
        {
          [bgMixAmount]: (value) => ({
            "--tw-bg-mix-amount": value,
          }),
        },
        {
          values: Object.fromEntries(
            Object.entries(theme("backgroundOpacity")).map(([key, value]) => [
              key,
              `${value * 100}`,
            ]),
          ),
        },
      );
      // add bg-mix-space utility
      matchUtilities(
        {
          [bgMixMethod]: (value) => ({
            "--tw-bg-mix-method": value,
          }),
        },
        {
          values: {
            srgb: "in srgb",
            "shorter-hue": "in hsl shorter hue",
            "longer-hue": "in hsl longer hue",
          },
        },
      );
      // add --tw-bg-base to bg-utility
      matchUtilities(
        {
          bg: (value) => {
            if (!corePlugins("backgroundOpacity")) {
              return {
                "background-color": toColorValue(value),
              };
            }

            return withAlphaVariable({
              color: value,
              property: "--tw-bg-base",
              variable: "--tw-bg-opacity",
            });
          },
        },
        {
          values: flattenColorPalette(theme("backgroundColor")),
          type: ["color", "any"],
        },
      );
    }),
  ],
};
