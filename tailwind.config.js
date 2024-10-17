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
        boxShadow1: "0px 1px 3px hsla(0, 0%, 0%, 0.5)",
        boxShadow2: "0px 3px 6px hsla(0, 0%, 0%, 0.4)",
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
