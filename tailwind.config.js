// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  // El array 'content' le dice a Tailwind CSS qué archivos debe escanear
  // para encontrar los nombres de clase que estás utilizando.
  // Tailwind solo generará CSS para las clases que encuentre en estos archivos.
  content: [
    "./index.html", // Incluye tu archivo HTML principal
    "./src/**/*.{js,ts,jsx,tsx}", // ¡Crucial!: Escanea todos los archivos JS, TS, JSX, TSX dentro del directorio src/
  ],
  theme: {
    extend: {
      // Puedes extender el tema predeterminado de Tailwind aquí, por ejemplo:
      colors: {
        "pharmacy-green": "#34D399",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Define fuentes personalizadas
      },
    },
  },
  plugins: [
    // Agrega cualquier plugin de Tailwind aquí si los necesitas más adelante, por ejemplo, require('@tailwindcss/forms')
  ],
};
