/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./app/**/*.{js,tsx,ts,jsx}", "./src/**/*.{js,tsx,ts,jsx}"],
  theme: {
    extend: {
      colors: {
        darkTextColor: "#ECEDEE",
        ligtTextColor: "#11181C",
        ui: {
          border: "#e9ecf0",
          grey: "#808ba8",
          background: "#f9fafb",
          error: "#f73746",
          success: "#3ecc62",
          warning: "#fde965",
          info: "#266ede",
        },
      },
    },
  },
  darkMode: "class",
  presets: [require("nativewind/preset")],
};
