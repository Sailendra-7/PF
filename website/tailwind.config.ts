import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sea: {
          950: "#04121f",
          900: "#071d33",
          800: "#0c2b4a",
          700: "#123e66",
          600: "#1b5e86",
          400: "#4fa3c7",
          200: "#a9d6e8",
        },
        parchment: {
          DEFAULT: "#f1e3c0",
          dark: "#d9c28f",
          deep: "#b89a5f",
        },
        ink: "#2a1a0c",
        wood: "#5b3a1e",
        straw: "#e8b23a",
        flag: "#c8102e",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        poster: ["var(--font-poster)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
      },
      boxShadow: {
        poster: "0 30px 60px -20px rgba(0,0,0,0.7), 0 8px 0 -2px rgba(91,58,30,0.55)",
        card: "0 18px 40px -18px rgba(0,0,0,0.65)",
      },
    },
  },
  plugins: [],
};

export default config;
