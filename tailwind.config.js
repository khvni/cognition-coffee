/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Subdued, PostHog-style canvas with Devin blue as the single accent.
        // accent = brand blue for fills/selection/UI; accent-ink = darker blue
        // for text/links so it clears AA contrast on the light canvas.
        canvas: "#eeefe9",
        panel: "#ffffff",
        ink: "#15171a",
        muted: "#5c6066",
        line: "#dadbd2",
        accent: "#317cff",
        "accent-ink": "#1f5ed8",
        wallpaper: "#d7d9cf",
      },
      fontFamily: {
        sans: ["'Inter Variable'", "Inter", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
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
