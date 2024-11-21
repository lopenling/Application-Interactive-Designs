/** @type {import('tailwindcss').Config} */

// hexToRgb helper from: https://github.com/tailwindlabs/tailwindcss-typography/blob/main/src/styles.js
const hexToRgb = (hex) => {
  hex = hex.replace("#", "");
  hex = hex.length === 3 ? hex.replace(/./g, "$&$&") : hex;
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `${r} ${g} ${b}`;
};

const styleCommon = ({ theme }) => ({
  css: {
    "--tw-prose-body": theme("colors.common[700]"),
    "--tw-prose-headings": theme("colors.common[850]"),
    "--tw-prose-lead": theme("colors.common[650]"),
    "--tw-prose-links": theme("colors.common[700]"),
    "--tw-prose-bold": theme("colors.common[850]"),
    "--tw-prose-counters": theme("colors.common[500]"),
    "--tw-prose-bullets": theme("colors.common[150]"),
    "--tw-prose-hr": theme("colors.common[100]"),
    "--tw-prose-quotes": theme("colors.common[850]"),
    "--tw-prose-quote-borders": theme("colors.common[100]"),
    "--tw-prose-captions": theme("colors.common[500]"),
    "--tw-prose-kbd": theme("colors.common[850]"),
    "--tw-prose-kbd-shadows": hexToRgb(theme("colors.common[850]")),
    "--tw-prose-code": theme("colors.common[850]"),
    "--tw-prose-pre-code": theme("colors.common[100]"),
    "--tw-prose-pre-bg": theme("colors.common[850]"),
    "--tw-prose-th-borders": theme("colors.common[150]"),
    "--tw-prose-td-borders": theme("colors.common[100]"),
    "--tw-prose-invert-body": theme("colors.common[150]"),
    "--tw-prose-invert-headings": theme("colors.white"),
    "--tw-prose-invert-lead": theme("colors.common[350]"),
    "--tw-prose-invert-links": theme("colors.white"),
    "--tw-prose-invert-bold": theme("colors.white"),
    "--tw-prose-invert-counters": theme("colors.common[350]"),
    "--tw-prose-invert-bullets": theme("colors.common[650]"),
    "--tw-prose-invert-hr": theme("colors.common[700]"),
    "--tw-prose-invert-quotes": theme("colors.common[50]"),
    "--tw-prose-invert-quote-borders": theme("colors.common[700]"),
    "--tw-prose-invert-captions": theme("colors.common[350]"),
    "--tw-prose-invert-kbd": theme("colors.white"),
    "--tw-prose-invert-kbd-shadows": hexToRgb(theme("colors.white")),
    "--tw-prose-invert-code": theme("colors.white"),
    "--tw-prose-invert-pre-code": theme("colors.common[150]"),
    "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
    "--tw-prose-invert-th-borders": theme("colors.common[650]"),
    "--tw-prose-invert-td-borders": theme("colors.common[700]"),
  },
});

const paragraphDeclarations = () => ({
  marginTop: "1.25em",
  marginBottom: "1.25em",
});

const leadDeclarations = () => ({
  marginTop: "1em",
  marginBottom: "1em",
});

const headingRules = ({ theme }) => ({
  h1: {
    marginBottom: "0.8em",
    fontWeight: theme("fontWeight.extrabold"),
    "& strong": {
      fontWeight: theme("fontWeight.black"),
    },
  },
  h2: {
    marginTop: "2em",
    marginBottom: "0.8em",
    fontWeight: theme("fontWeight.extrabold"),
    "& strong": {
      fontWeight: theme("fontWeight.black"),
    },
  },
  h3: {
    marginTop: "2em",
    marginBottom: "0.8em",
    fontWeight: theme("fontWeight.bold"),
    "& strong": {
      fontWeight: theme("fontWeight.extrabold"),
    },
  },
  h4: {
    marginTop: "2em",
    marginBottom: "0.8em",
    fontWeight: theme("fontWeight.semibold"),
    "& strong": {
      fontWeight: theme("fontWeight.bold"),
    },
  },
});

const typeScaleSm = ({ theme }) => ({
  css: {
    fontSize: theme("fontSize.sm[0]"),
    lineHeight: "1.75",
    p: {
      ...paragraphDeclarations(),
    },
    '[class~="lead"]': {
      ...leadDeclarations(),
      fontSize: theme("fontSize.lg[0]"),
      lineHeight: "1.6",
    },
    h1: {
      ...headingRules(theme).h1,
      fontSize: theme("fontSize.4xl[0]"),
      lineHeight: theme("fontSize.4xl[1].lineHeight"),
    },
    h2: {
      ...headingRules(theme).h2,
      fontSize: theme("fontSize.xl[0]"),
      lineHeight: theme("fontSize.xl[1].lineHeight"),

      // Override the headingRules fontWeights
      fontWeight: theme("fontWeight.bold"),
      "& strong": {
        fontWeight: theme("fontWeight.extrabold"),
      },
    },
    h3: {
      ...headingRules(theme).h3,
      fontSize: theme("fontSize.base[0]"),
      lineHeight: theme("fontSize.base[1].lineHeight"),

      // Override the headingRules fontWeights
      fontWeight: theme("fontWeight.semibold"),
      "& strong": {
        fontWeight: theme("fontWeight.bold"),
      },
    },
    h4: {
      ...headingRules(theme).h4,
      fontSize: theme("fontSize.sm[0]"),
      lineHeight: theme("fontSize.sm[1].lineHeight"),
    },
  },
});

const typeScaleBase = ({ theme }) => ({
  css: {
    fontSize: theme("fontSize.base[0]"),
    lineHeight: "1.75",
    p: {
      ...paragraphDeclarations(),
    },
    '[class~="lead"]': {
      ...leadDeclarations(),
      fontSize: theme("fontSize.xl[0]"),
      lineHeight: "1.6",
    },
    h1: {
      ...headingRules(theme).h1,
      fontSize: theme("fontSize.6xl[0]"),
      lineHeight: theme("fontSize.6xl[1].lineHeight"),
    },
    h2: {
      ...headingRules(theme).h2,
      fontSize: theme("fontSize.3xl[0]"),
      lineHeight: theme("fontSize.3xl[1].lineHeight"),
    },
    h3: {
      ...headingRules(theme).h3,
      fontSize: theme("fontSize.lg[0]"),
      lineHeight: theme("fontSize.lg[1].lineHeight"),
    },
    h4: {
      ...headingRules(theme).h4,
      fontSize: theme("fontSize.base[0]"),
      lineHeight: theme("fontSize.base[1].lineHeight"),
    },
  },
});

const typeScaleLg = ({ theme }) => ({
  css: {
    fontSize: theme("fontSize.lg[0]"),
    lineHeight: "1.75",
    p: {
      ...paragraphDeclarations(),
    },
    '[class~="lead"]': {
      ...leadDeclarations(),
      fontSize: theme("fontSize.2xl[0]"),
      lineHeight: "1.6",
    },
    h1: {
      ...headingRules(theme).h1,
      fontSize: theme("fontSize.8xl[0]"),
      lineHeight: theme("fontSize.8xl[1].lineHeight"),
    },
    h2: {
      ...headingRules(theme).h2,
      fontSize: theme("fontSize.5xl[0]"),
      lineHeight: theme("fontSize.5xl[1].lineHeight"),
    },
    h3: {
      ...headingRules(theme).h3,
      fontSize: theme("fontSize.2xl[0]"),
      lineHeight: theme("fontSize.2xl[1].lineHeight"),
    },
    h4: {
      ...headingRules(theme).h4,
      fontSize: theme("fontSize.lg[0]"),
      lineHeight: theme("fontSize.lg[1].lineHeight"),
    },
  },
});

const typeScaleXl = ({ theme }) => ({
  css: {
    fontSize: theme("fontSize.xl[0]"),
    lineHeight: "1.75",
    p: {
      ...paragraphDeclarations(),
    },
    '[class~="lead"]': {
      ...leadDeclarations(),
      fontSize: theme("fontSize.3xl[0]"),
      lineHeight: "1.6",
    },
    h1: {
      ...headingRules(theme).h1,
      fontSize: theme("fontSize.9xl[0]"),
      lineHeight: theme("fontSize.9xl[1].lineHeight"),
    },
    h2: {
      ...headingRules(theme).h2,
      fontSize: theme("fontSize.6xl[0]"),
      lineHeight: theme("fontSize.6xl[1].lineHeight"),
    },
    h3: {
      ...headingRules(theme).h3,
      fontSize: theme("fontSize.3xl[0]"),
      lineHeight: theme("fontSize.3xl[1].lineHeight"),
    },
    h4: {
      ...headingRules(theme).h4,
      fontSize: theme("fontSize.xl[0]"),
      lineHeight: theme("fontSize.xl[1].lineHeight"),
    },
  },
});

const typeScale2Xl = ({ theme }) => ({
  css: {
    fontSize: theme("fontSize.2xl[0]"),
    lineHeight: "1.75",
    p: {
      ...paragraphDeclarations(),
    },
    '[class~="lead"]': {
      ...leadDeclarations(),
      fontSize: theme("fontSize.4xl[0]"),
      lineHeight: "1.6",
    },
    h1: {
      ...headingRules(theme).h1,
      fontSize: theme("fontSize.10xl[0]"),
      lineHeight: theme("fontSize.10xl[1].lineHeight"),
    },
    h2: {
      ...headingRules(theme).h2,
      fontSize: theme("fontSize.7xl[0]"),
      lineHeight: theme("fontSize.7xl[1].lineHeight"),
    },
    h3: {
      ...headingRules(theme).h3,
      fontSize: theme("fontSize.4xl[0]"),
      lineHeight: theme("fontSize.4xl[1].lineHeight"),
    },
    h4: {
      ...headingRules(theme).h4,
      fontSize: theme("fontSize.2xl[0]"),
      lineHeight: theme("fontSize.2xl[1].lineHeight"),
    },
  },
});

export default {
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            ...typeScaleBase(theme).css,
            ...styleCommon(theme).css,

            "h1, h2, h3, h4, h5, h6, p, li, blockquote, figcaption": {
              textWrap: "pretty",
            },
            a: {
              textDecorationThickness: "2px",
              textUnderlineOffset: "3px",
              textDecorationColor: theme("colors.secondary.450 / 45%"),
              transitionProperty:
                "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              transitionDuration: "150ms",
              "&:hover": {
                color: theme("colors.secondary.850"),
                textDecorationThickness: "3px",
                textUnderlineOffset: "2px",
                textDecorationColor: theme("colors.secondary.500 / 50%"),
              },
              "&:focus-visible": {
                outline: `solid 2px ${theme("colors.primary.650")}`,
                outlineOffset: "1px",
                borderRadius: "0.5px",
                textDecorationColor: "transparent",
                transitionDuration: "0ms",
                "&:hover": {
                  textDecorationColor: "transparent",
                },
              },
            },
            "a:has(img)": {
              display: "block",
              maxWidth: "max-content",
            },
            ":where(h1, h2, h3, h4) a": {
              fontWeight: "inherit",
              color: "inherit",
              textDecorationColor: "color-mix(in srgb, var(--tw-prose-headings) 33%, transparent)",
              "&:hover": {
                color: "inherit",
                textDecorationColor:
                  "color-mix(in srgb, var(--tw-prose-headings) 66%, transparent)",
              },
            },
          },
        },
        sm: typeScaleSm(theme),
        base: typeScaleBase(theme),
        lg: typeScaleLg(theme),
        xl: typeScaleXl(theme),
        "2xl": typeScale2Xl(theme),
        common: styleCommon(theme),
      }),
    },
  },
};
