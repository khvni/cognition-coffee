/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#ffffff",
        panel: "#f5f5f5",
        ink: "#171717",
        muted: "#6b7280",
        line: "#e5e5e5",
        accent: "#317CFF",
        "accent-ink": "#285AC8",
        wallpaper: "#e0e0e0",
      },
      fontFamily: {
        sans: ["'Geist Variable'", "Geist", "system-ui", "sans-serif"],
        mono: ["'Geist Mono Variable'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        window: "0px 0px 0px 1px rgba(0,0,0,0.08), 0 10px 30px -10px rgba(21, 23, 26, 0.35)",
        card: "0px 0px 0px 1px rgba(0,0,0,0.06), 0px 1px 2px -1px rgba(0,0,0,0.06), 0px 2px 4px 0px rgba(0,0,0,0.04)",
      },
      borderRadius: {
        win: "10px",
      },
      maxWidth: {
        reader: "40rem",
        page: "40rem",
        narrow: "35rem",
      },
    },
  },
  plugins: [],
}
