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
        azimut: {
          red: '#c92337',
          dark: '#0a0e18',
          light: '#d3cec3',
        },
      },
    },
  },
  plugins: [],
}


































