import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50:  '#FAF5E9',
          100: '#F4EBCF',
          200: '#E8D7B9',
          300: '#D9C19A',
          400: '#C9A36A',
          500: '#B8893A',
        },
        earth: {
          100: '#C4A882',
          200: '#A07850',
          300: '#7A4E2D',
          400: '#5C3520',
          500: '#3B2A1E',
          600: '#2A1C12',
        },
        crimson: {
          100: '#E8A0A0',
          200: '#D05555',
          300: '#A52A2A',
          400: '#7A1F1F',
          500: '#521414',
        },
        gold: {
          100: '#F5D98A',
          200: '#E8C348',
          300: '#D4A017',
          400: '#C9A62A',
          500: '#A07A10',
        },
        daiviet: {
          300: '#4ade80',
          400: '#22c55e',
          500: '#16a34a',
        },
        mongol: {
          300: '#D05555',
          400: '#A52A2A',
          500: '#7A1F1F',
        },
      },
      fontFamily: {
        'playfair':    ['Playfair Display', 'Georgia', 'serif'],
        'playfair-sc': ['Playfair Display SC', 'Georgia', 'serif'],
        'garamond':    ['EB Garamond', 'Georgia', 'serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'parchment-texture': "url('/textures/parchment.svg')",
        'hero-gradient': 'linear-gradient(to bottom, rgba(59,42,30,0.7) 0%, rgba(30,15,5,0.85) 100%)',
      },
      boxShadow: {
        'parchment': '0 4px 24px rgba(59,42,30,0.18), 0 1px 4px rgba(59,42,30,0.12)',
        'parchment-lg': '0 8px 40px rgba(59,42,30,0.22), 0 2px 8px rgba(59,42,30,0.15)',
        'crimson-glow': '0 0 24px rgba(165,42,42,0.5)',
        'gold-glow': '0 0 24px rgba(212,160,23,0.5)',
        'daiviet-glow': '0 0 30px rgba(34,197,94,0.35)',
        'mongol-glow': '0 0 30px rgba(165,42,42,0.35)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fog': 'fogDrift 12s ease-in-out infinite',
        'shimmer': 'shimmer 1.8s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fogDrift: {
          '0%, 100%': { transform: 'translateX(-10%) scaleY(1)', opacity: '0.06' },
          '50%':      { transform: 'translateX(10%) scaleY(1.1)', opacity: '0.12' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-600px 0' },
          '100%': { backgroundPosition: '600px 0' },
        },
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
export default config
