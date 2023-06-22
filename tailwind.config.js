/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        ovoflow: {
          primary: '#516092',
          secondary: '#ebadad',
          accent: '#0817a0',
          neutral: '#a8a29e',
          'base-100': '#f3f4f6',
          info: '#4bb7f1',
          success: '#83ccae',
          warning: '#ffc409',
          error: '#d67c7c',
        },
      },
    ],
  },
};
