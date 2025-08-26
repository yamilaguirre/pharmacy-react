import { defineConfig } from "@tailwindcss/vite";

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#FFFFFF",
        secondary: "#FFFFFF",
        accent: "#F59E0B",
        light: "#F3F4F6",
        dark: "#111827",
        focus: "#2563EB",
      },
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"],
      },
      fontSize: {
        title: "3rem",
        subtitle: "1.5rem",
        "base-md": "1rem",
      },
    },
  },
});
