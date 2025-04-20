/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./app/**/*.{js,tsx,ts,jsx}", "./src/**/*.{js,tsx,ts,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        proxima: {
          light: "Poximanova400",
          medium: "Poximanova",
          semibold: "Poximanova600",
          bold: "Poximanova700",
          extrabold: "Poximanova800",
        },
      },
      colors: {
        darkTextColor: "#ECEDEE",
        ligtTextColor: "#11181C",
        darkBackground: "#151718",
        ui: {
          border: "#e9ecf0",
          grey: "#808ba8",
          background: "#f9fafb",
          error: "#f73746",
          success: "#3ecc62",
          warning: "#fde965",
          info: "#266ede",
        },
        darker: {
          100: "#141414",
        },
      },
      fontSize: {
        xss: [
          "12px",
          {
            lineHeight: "16px",
            letterSpacing: "0.1px",
          },
        ],
      },
    },
  },
  darkMode: "class",
  presets: [require("nativewind/preset")],
};
