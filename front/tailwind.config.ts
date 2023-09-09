import type { Config } from 'tailwindcss'

const config: Config = {
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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      textColor: {
        'dark-blue': '#0A0D14',
        'gray-250': '#A6A8AA',
        'gray-1000': '#121620',
        'pale-blue': '#6F79FD',
        'blue-gray': '#666C7D',
        'blue-violet-500': '#4E57D3',
        'lilac': '#C1A4FF',
        'midnight-blue': '#1F2533'
      },
      backgroundColor: {
        'dark-blue': '#0A0D14',
        'gray-1000': '#121620',
        'pale-blue': '#6F79FD',
        'pale-blue-transparent': 'rgba(111, 121, 253, 0.10)',
        'blue-gray': '#666C7D',
        'blue-violet-500': '#4E57D3',
        'blue-violet-600': '#505AE0',
        'lilac': '#C1A4FF',
        'midnight-blue': '#1F2533'
      },
      gradientColorStops: {
        'dark-blue': '#0A0D14',
        'gray-1000': '#121620',
        'blue-gray': '#666C7D',
        'blue-violet-500': '#4E57D3',
        'lilac': '#C1A4FF',
        'midnight-blue': '#1F2533'
      },
      borderColor: {
        'pale-blue-transparent': 'rgba(111, 121, 253, 0.10)',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config;
