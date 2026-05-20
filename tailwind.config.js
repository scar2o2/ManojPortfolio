/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f7f4ec",
        ink: "#141414",
        smoke: "#e7e0d2",
        muted: "#68645d",
        sage: "#526f57",
        steel: "#315f8c",
        clay: "#b5564e",
        gold: "#c89b3c"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      boxShadow: {
        soft: "0 24px 70px rgba(24, 22, 18, 0.08)",
        hover: "0 28px 80px rgba(24, 22, 18, 0.16)"
      }
    }
  },
  plugins: []
};
