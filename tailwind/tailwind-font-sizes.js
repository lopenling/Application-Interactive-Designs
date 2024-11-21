/** @type {import('tailwindcss').Config} */
const rem = (px) => `${Number((px / 16).toFixed(7))}rem`;

export default {
  theme: {
    extend: {
      // 1.125 Major Second Scale - Based on 14px
      fontSize: {
        "3xs": [rem(10), { lineHeight: rem(14) }], // 1.4
        "2xs": [rem(11), { lineHeight: rem(16) }], // 1.455
        xs: [rem(12), { lineHeight: rem(17) }], // 1.417
        sm: [rem(14), { lineHeight: rem(20) }], // 1.429
        base: [rem(16), { lineHeight: rem(23) }], // 1.438
        lg: [rem(18), { lineHeight: rem(25) }], // 1.389
        xl: [rem(20), { lineHeight: rem(27) }], // 1.35
        "2xl": [rem(22), { lineHeight: rem(29) }], // 1.318
        "3xl": [rem(25), { lineHeight: rem(32) }], // 1.28
        "4xl": [rem(28), { lineHeight: rem(35) }], // 1.25
        "5xl": [rem(32), { lineHeight: rem(39) }], // 1.219
        "6xl": [rem(36), { lineHeight: rem(43) }], // 1.194
        "7xl": [rem(40), { lineHeight: "1.15" }],
        "8xl": [rem(45), { lineHeight: "1.13" }],
        "9xl": [rem(51), { lineHeight: "1.11" }],
        "10xl": [rem(58), { lineHeight: "1.1" }],
        "11xl": [rem(65), { lineHeight: "1.05" }],
        "12xl": [rem(73), { lineHeight: "1" }],
        "13xl": [rem(82), { lineHeight: "1" }],
        "14xl": [rem(92), { lineHeight: "1" }],
        "15xl": [rem(103), { lineHeight: "1" }],
        "16xl": [rem(117), { lineHeight: "1" }],
        "17xl": [rem(131), { lineHeight: "1" }],
      },
    },
  },
};
