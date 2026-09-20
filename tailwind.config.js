/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#202B3D",
          light: "#3C4A61",
          faint: "#7D8AA0",
        },
        paper: {
          DEFAULT: "#EDEFE7",
          card: "#F7F8F3",
        },
        brass: {
          DEFAULT: "#B98419",
          dark: "#8C6412",
          light: "#E8C878",
        },
        verified: {
          DEFAULT: "#3F6B54",
          light: "#DCE8DF",
        },
        rust: {
          DEFAULT: "#B34632",
          light: "#F3DEDA",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["IBM Plex Sans", "sans-serif"],
      },
      borderRadius: {
        card: "4px",
      },
    },
  },
  plugins: [],
};