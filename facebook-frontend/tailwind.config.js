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
        "128":"32rem",
        "140":"35rem",
        "150":"37.5rem",
        "160":"40rem",
        "170":"42.5rem",
        "180":"45rem",
        "190":"47.5rem",
        "200":"50rem",
      },
    },
  },
  plugins: [],
};
