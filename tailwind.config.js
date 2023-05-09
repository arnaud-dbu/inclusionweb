/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: {
        // 50: '#fdf8f6',
        // 100: '#f2e8e5',
        200: '#EFF7F7',
        300: '#E9F5F5',
        400: '#CAEBEB',
        500: '#B6E4E3',
        600: '#82D3D0',
        700: '#51C2BE',
        800: '#1DB1AB',
        900: '#008E89',
      },
      secondary: {
        800: '#E7C14B',
        900: '#E7B113',
      },
      neutral: {
        300: '#DDEDEE',
        400: '#D2E2E5',
        500: '#B6CED4',
        600: '#93B8C1',
        700: '#51C2BE',
        800: '#427D8F',
        900: '#0C566D',
      }
    },
    fontFamily: {
      primary: ['var(--font-antonio)'],
      secondary: ['var(--font-asap)'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
