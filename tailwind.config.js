/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      screens: {
        xs: "300px",
      },
      colors: {
        "gray-light": "#353535",
        "gray-dark": "#272727",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#06b6d4",
          secondary: "#D926A9",
          accent: "#1FB2A6",
          neutral: "#191D24",
          "base-100": "#272727",
          "base-200": "#353535",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
};
