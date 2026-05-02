import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#090909",
        surface: "#121212",
        soft: "#1a1a1a",
        line: "#2a2a2a",
        text: "#f3f3f3",
        muted: "#9a9a9a",
        accent: "#9be7ff",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(155, 231, 255, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
