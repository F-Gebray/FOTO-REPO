/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ["Cormorant Garamond", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        gold: "#c9a96e",
        dark: {
          DEFAULT: "#0e0e0e",
          card: "#161612",
          surface: "#1c1c18",
        },
        cream: "#f0ede6",
      },
    },
  },
  plugins: [],
};
