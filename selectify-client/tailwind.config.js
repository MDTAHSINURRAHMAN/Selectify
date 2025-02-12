/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        karla: ["Karla", "sans-serif"],
      },
      colors: {
        "background-color": "#FFFFFF",
        "banner-title": "#000000",
        "hover-color": "#578E7E",
      },
    },
  },
  plugins: [require("daisyui")],
};

