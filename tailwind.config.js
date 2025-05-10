import textShadow from "tailwindcss-textshadow";
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Cambié 'selector' por 'class'
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [textShadow],
};
  