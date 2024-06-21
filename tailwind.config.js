/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '15px',
      full: '9999px',
      large: '12px',
    },
    extend: {
      fontSize: {
        sm: '0.875rem',
        base: '1rem',
      },
      colors: {
        blue: {
          400: '#2589fe',
          500: '#0070f3',
          600: '#2f6feb',
        },
        primary: {
          100: '#fbfbf8', //
          // 200: '#f3f4e5',
          // 300: '#ebff79',
          // 'blue': '#3555f4',
          // 'green': '#7efb15',
          // 'orange': '#f9c813',
          // 'lightPink': '#f9ebdb',
          // 'pink': '#fe2fb4',
        },
        grey: {
          // 100: '#ededed',
          // 200: '#d3d2d8',
          // 300: '#6c6c6c',
          // 400: '#5f5d5e',
          500: '#4a4a4a', //
          // 600: '#1c1a1b',
        },
        highlight: {
          60: '#EBFF79',
          50: '#16120F',
          40: '#FF9500',
          30: '#FA64B5',
          20: '#A3EA71',
        },
        neutrals: {
          0: '#FFFFFF',
          20: '#E9E5D9',
          30: '#EDEDED',
          60: '#555454',
          70: '#3E3D3D',
          80: '#262525',
          90: '#161616',
        },
        text: {
          'onDark-primary': '#FFFFFF',
          'onDark-secondary': '#9E9E9E',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {
      '3xl': { max: '2200px' },
      // => @media (max-width: 1535px) { ... }

      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }

      xs: { max: '479px' },
      // => @media (max-width: 479px) { ... }
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
