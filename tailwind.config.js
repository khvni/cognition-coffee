/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm wax-paper beige, near-black ink, Devin blue as the single accent.
        // accent = brand blue for fills/selection/UI; accent-ink = darker blue
        // for text/links so it clears AA contrast on canvas and panel.
        canvas: "#EBE4D8",
        panel: "#F6F1E7",
        ink: "#1B1A17",
        muted: "#6E6557",
        line: "#D8CFBE",
        accent: "#317CFF",
        "accent-ink": "#2A5FD0",
        wallpaper: "#C9BFA9",
      },
      fontFamily: {
        sans: ["'Geist Variable'", "Geist", "system-ui", "sans-serif"],
        mono: ["'Geist Mono Variable'", "ui-monospace", "monospace"],
        serif: ["'STIX Two Text'", "Georgia", "serif"],
      },
      boxShadow: {
        window: "0 10px 30px -10px rgba(21, 23, 26, 0.35)",
        card: "0 1px 0 rgba(21,23,26,0.04), 0 1px 2px rgba(21,23,26,0.06)",
      },
      borderRadius: {
        win: "10px",
      },
      maxWidth: {
        reader: "44rem",
      },
    },
  },
  plugins: [],
}
