const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lameBlue: "#E7FAFE",
        darkBlue: "#ccf1f9",
        mainBlue: "#0ec9f1",
        darkerBlue: "#00c0e9",
        secondary: "rgba(0, 0, 0, 0.6)",
        lightPurple: "rgba(244, 245, 250, 1)",
        darkPurple: "rgba(145, 85, 253, 1)",
        lightBlack: "rgba(58, 53, 65, 0.87)",
      },
      fontFamily: {
        inter: ["inter", ...defaultTheme.fontFamily.sans],
        lobster: ["lobster", ...defaultTheme.fontFamily.sans],
      },
      rotate: { 135: "135deg", 45: "45deg  " },
    },
  },
  plugins: [],
};
