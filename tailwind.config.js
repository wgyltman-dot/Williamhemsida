/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        mont: ["var(--font-mont)", ...fontFamily.sans],
      },
      colors: {
        dark: "#0a0a0a",
        light: "#f0f0f0",
        primary: "#6366f1", // indigo-500
        primaryDark: "#818cf8", // indigo-400 for dark mode
        secondary: "#06b6d4", // cyan-500
        accent: "#6366f1",
        surface: "#111111",
        surfaceLight: "#f7f7f7",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
      },
      backgroundImage: {
        circularLight:
          "repeating-radial-gradient(rgba(0,0,0,0.4) 2px,#f0f0f0 5px,#f0f0f0 100px)",
        circularDark:
          "repeating-radial-gradient(rgba(255,255,255,0.1) 2px,#0a0a0a 8px,#0a0a0a 100px)",
        circularLightLg:
          "repeating-radial-gradient(rgba(0,0,0,0.4) 2px,#f0f0f0 5px,#f0f0f0 80px)",
        circularDarkLg:
          "repeating-radial-gradient(rgba(255,255,255,0.1) 2px,#0a0a0a 8px,#0a0a0a 80px)",
        circularLightMd:
          "repeating-radial-gradient(rgba(0,0,0,0.4) 2px,#f0f0f0 5px,#f0f0f0 60px)",
        circularDarkMd:
          "repeating-radial-gradient(rgba(255,255,255,0.1) 2px,#0a0a0a 8px,#0a0a0a 60px)",
        circularLightSm:
          "repeating-radial-gradient(rgba(0,0,0,0.4) 2px,#f0f0f0 5px,#f0f0f0 40px)",
        circularDarkSm:
          "repeating-radial-gradient(rgba(255,255,255,0.1) 2px,#0a0a0a 8px,#0a0a0a 40px)",
      },
      boxShadow: {
        "3xl": "0 15px 15px 1px rgba(99,102,241, 0.4)",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }

      xs: { max: "479px" },
      // => @media (max-width: 479px) { ... }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
