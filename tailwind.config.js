/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary))", // Note the addition of opacity support
        secondary: "rgb(var(--secondary))",
        base: "rgb(var(--base))",
        base200: "rgb(var(--base200))",
        neutral: "rgb(var(--neutral))",
        accent: "rgb(var(--accent))",
        text: "rgb(var(--text))",
        low: "rgb(var(--low))",
        high: "rgb(var(--high))",
        medium: "rgb(var(--medium))",
      },
    },
  },
  plugins: [],
};
