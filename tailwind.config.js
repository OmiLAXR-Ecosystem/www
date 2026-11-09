// Theme values from Material Tailwind, which the site was originally built with.
// Its components are no longer used, so its withMT() content globs are left out.
const colors = require("@material-tailwind/react/theme/base/colors");
const fontFamily = require("@material-tailwind/react/theme/base/typography");
const boxShadow = require("@material-tailwind/react/theme/base/shadows");
const screens = require("@material-tailwind/react/theme/base/breakpoints");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors,
    fontFamily,
    boxShadow,
    screens,
    extend: {
      colors: {
        blue: {
          DEFAULT: "#23304c",
          500: "#23304c",
        },
        yellow: {
          DEFAULT: "#F19937",
          500: "#F19937",
        },
        red: {
          DEFAULT: "#EA4E3D",
          500: "#EA4E3D",
        },
        green: {
          DEFAULT: "#67C23A",
          500: "#67C23A",
        },
        sky: {
          DEFAULT: "#55A6F8",
          500: "#55A6F8",
        },
        slate: {
          DEFAULT: "#64748B",
          500: "#64748B",
        },
        dark: {
          DEFAULT: "#1E293B",
          500: "#0F172A",
        },
      },
    },
  },
  plugins: [],
};
