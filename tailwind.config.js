/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./app/**/*.{js,tsx,ts,jsx}", "./src/**/*.{js,tsx,ts,jsx}"],
  theme: {
    extend: {
      colors: {
        darkTextColor: "#ECEDEE",
        ligtTextColor: "#11181C",
      },
    },
  },
  darkMode: "class",
  presets: [require("nativewind/preset")],
};
