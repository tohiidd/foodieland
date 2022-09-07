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
      backgroundImage: {
        "gradient-gray":
          "linear-gradient(180deg, rgba(112, 130, 70, 0) 30%, rgba(112, 130, 70, 0.1) 100%)",
        "gradient-darkGray":
          "linear-gradient(180deg, rgba(112, 130, 70, 0) 25%, rgba(112, 130, 70, 0.3) 100%)",
        "gradient-green":
          "linear-gradient(180deg, rgba(108, 198, 63, 0) 30%, rgba(108, 198, 63, 0.1) 100%)",
        "gradient-darkGreen":
          "linear-gradient(180deg, rgba(108, 198, 63, 0) 25%, rgba(108, 198, 63, 0.3) 100%)",
        "gradient-red":
          "linear-gradient(180deg, rgba(204, 38, 27, 0) 30%, rgba(204, 38, 27, 0.1) 100%)",
        "gradient-darkRed":
          "linear-gradient(180deg, rgba(204, 38, 27, 0) 25%, rgba(204, 38, 27, 0.3) 100%)",
        "gradient-yellow":
          "linear-gradient(180deg, rgba(240, 158, 0, 0) 30%, rgba(240, 158, 0, 0.1) 100%)",
        "gradient-darkYellow":
          "linear-gradient(180deg, rgba(240, 158, 0, 0) 25%, rgba(240, 158, 0, 0.3) 100%)",
        "gradient-white":
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.05) 100%)",
        "gradient-darkWhite":
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0.09) 100%)",
        "gradient-brown":
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.05) 100%)",
        "gradient-darkBrown":
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0.09) 100%)",
        "gradient-blueSky":
          " linear-gradient(180deg, rgba(231, 249, 253, 0) 0%, rgba(231, 249, 253, 1) 100%)",
      },
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      screens: {
        xs: "100%",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
