/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#4F46E5",
          foreground: "#FFFFFF",
          light: "#EEF2FF",
          dark: "#4338CA"
        },
        secondary: {
          DEFAULT: "#7C3AED",
          foreground: "#FFFFFF",
          light: "#F5F3FF"
        },
        accent: {
          DEFAULT: "#14B8A6",
          foreground: "#FFFFFF",
          light: "#F0FDFA"
        },
        brand: {
          blue: "#3B82F6",
          emerald: "#10B981",
          amber: "#F59E0B",
          rose: "#EF4444",
          purple: "#8B5CF6"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'elevated': '0 10px 30px -5px rgba(0, 0, 0, 0.07)',
        'glow': '0 0 25px -5px rgba(79, 70, 229, 0.25)',
      }
    },
  },
  plugins: [],
}
