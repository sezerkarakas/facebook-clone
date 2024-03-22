/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {},
    extend: {
      textUnderlineOffset: {
        20: "20px",
      },
      width: {
        "3/10": "30%",
      },
      colors: {
        "special-green": "#00a400",
      },
    },
  },
  plugins: [],
};
