/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pointRed: "#ff3334",
        lightRed: "#fb7777",
      },
      gridTemplateColumns: {
        custom: "1fr 5fr 1fr",
      },
    },
  },
  plugins: [],
};
