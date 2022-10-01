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
      typography: ({ theme }) => ({
        white: {
          css: {
            "--tw-prose-body": theme("colors.white"),
            "--tw-prose-headings": theme("colors.white"),
            "--tw-prose-lead": theme("colors.white"),
            "--tw-prose-links": theme("colors.white"),
            "--tw-prose-bold": theme("colors.white"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
