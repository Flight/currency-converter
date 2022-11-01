/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");
const lineClamp = require("@tailwindcss/line-clamp");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: "2rem",
      },
    },
    extend: {
      screens: {
        xs: "320px",
        "3xl": "2000px",
        "4xl": "2300px",
      },
      fontSize: {
        "2xs": "0.625rem",
        "2xl": "1.75rem",
      },
      transitionProperty: {
        spacing: "margin, padding",
        height: "height",
        maxHeight: "max-height",
        display: "display",
      },
      transitionDelay: {
        0: "0ms",
      },
    },
  },
  plugins: [
    lineClamp,
    plugin(({ addVariant }) => {
      addVariant("second", "&:nth-child(2)");
      addVariant("group-second", ".group:nth-child(2) &");
      addVariant("third", "&:nth-child(3)");
      addVariant("group-third", ".group:nth-child(3) &");
      addVariant("group-active-child", ".group-active &");
    }),
  ],
};
