/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E87C7C',
          hover: '#E05D5D',
          light: '#FFE5E5',
        },
        background: {
          light: '#FFF5F5',
          dark: '#1A0F0F',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#2D1B1B',
        },
        border: {
          light: '#FFD4D4',
          dark: '#3D2626',
        },
        text: {
          primary: {
            light: '#2D1B1B',
            dark: '#FFF5F5',
          },
          secondary: {
            light: '#8B6B6B',
            dark: '#D4BABA',
          },
          tertiary: {
            light: '#B89494',
            dark: '#8B6B6B',
          },
        },
        success: '#4ECDC4',
        warning: '#FFB84D',
        error: '#E85D75',
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      borderRadius: {
        base: '0.75rem',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

