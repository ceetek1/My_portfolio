/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0a192f",
        "light-navy": "#112240",
        "lightest-navy": "#233554",
        slate: "#8892b0",
        "slate-light": "#ccd6f6",
        mint: "#64ffda",
        "slate-line": "rgba(136, 146, 176, 0.22)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
