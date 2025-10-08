import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}", "./src/lib/**/*.{ts,tsx}", "./src/data/**/*.{ts,tsx,json}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#556B2F",
          gold: "#C8A951",
          dark: "#1F1F1F"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
