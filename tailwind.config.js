/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B1F4D',
          light: '#1a3a8a',
          dark: '#060f26',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#e8c84a',
          dark: '#b8961f',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0B1F4D 0%, #1a3a8a 50%, #0B1F4D 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37, #e8c84a)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
