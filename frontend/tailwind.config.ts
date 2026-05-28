import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0a0b0e',
        surface: '#0f1014',
        surface2: '#141519',
        surface3: '#1a1b21',
        border: {
          DEFAULT: '#1e2029',
          hi: '#252733',
          soft: '#252733'
        },
        parchment: {
          DEFAULT: '#ddd0c0',
          dim: '#a89a8a',
          muted: '#6b5f54'
        },
        sage: '#8dba85',
        sand: '#b89a6e',
        rose: '#b88a8a',
        sky: '#7aa8c0',
        text: {
          primary: '#e8eaf0',
          secondary: '#7a8394',
          muted: '#3e4454'
        }
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-up': 'fade-up 500ms ease-out forwards',
        'panel-in': 'panel-in 600ms 120ms ease-out forwards',
        'grow': 'grow 700ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'blink': 'blink 1.8s ease-in-out infinite',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'panel-in': {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'grow': {
          '0%': { width: '0' },
          '100%': { width: 'var(--target-width, 100%)' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        }
      }
    },
  },
  plugins: [],
} satisfies Config
