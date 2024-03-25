/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark_bg: "#1C1D22",
        dark_bg_sec: "#26272D",
        primary: "#FFFFFF",
        secondary: "#a9a8ab",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        nunitoSans: ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
