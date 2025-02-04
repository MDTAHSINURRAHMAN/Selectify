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
        "background-color": "#D9DCE0",
        "banner-title": "#283147",
        "hover-color": "#ED3333",
      },
    },
  },
  plugins: [require("daisyui")],
};

