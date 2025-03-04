import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      screens: {
        xl: "1320px",
        lg: "900px",
        md: "750px",
        sm: "350px",
      },
      colors: {
        primary: "var(--background-color)",
        secondary: "var(--foreground)",
        blue: "var(--blue)",
        grass: "var(--grass)",
        danger: "var(--danger)",
        "gray-1": "var(--gray-1)",
        "gray-2": "var(--gray-2)",
        "gray-3": "var(--gray-3)",
        "gray-4": "var(--gray-4)",
        overlay: "var(--overlay)",
      },
      spacing: {
        "1": "5px",
        "2": "10px",
        "3": "15px",
        "4": "20px",
        "4.4": "25px",
        "4.5": "30px",
        "4.7": "35px",
        "5": "40px",
        "6": "50px",
        "7": "60px",
      },
      keyframes: {
        slideDownAndFade: {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideUpAndFade: {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        slideDownAndFade:
          "slideDownAndFade 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("tailwindcss-multi"),
  ],
};

export default config;
