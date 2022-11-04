/** @type {import('tailwindcss').Config} */
const lineClamp = require("@tailwindcss/line-clamp");
const daisyui = require("daisyui");

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  plugins: [lineClamp, daisyui],
};
