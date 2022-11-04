/** @type {import('tailwindcss').Config} */
const lineClamp = require("@tailwindcss/line-clamp");

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  plugins: [lineClamp],
};
