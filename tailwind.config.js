/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nurito: ["Nurito", "sans-serif"],
        popins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
