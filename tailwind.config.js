/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./resources/**/*.{edge,html,js,ts,tsx,jsx,vue}"],
  darkMode: 'class', // class or media
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("prettier-plugin-tailwindcss"),
    require("tailwind-scrollbar"),
  ],
  variants: {
    scrollbar: ["rounded"],
  },
};
