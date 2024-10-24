/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./assets/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          lg: "0.625rem",
        },
      },
      boxShadow: {
        boxShadow1: "#171717 0px 22px 70px 4px;",
       
      },
      borderRadius: {
        "4xl": "28px",
      },
      fontFamily: {
        MaterialRounded: "Material Symbol Rounded",
      },
    },
    plugins: [
      function ({ addVariant }) {
        addVariant("child", "& > *");
        addVariant("child-hover", "& > *:hover");
      },
    ],
  },
};
