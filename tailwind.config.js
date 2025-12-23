/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    "from-blue-50",
    "to-blue-100",
    "hover:border-blue-100",
    "from-amber-50",
    "to-amber-100",
    "hover:border-amber-100",
    "from-green-50",
    "to-green-100",
    "hover:border-green-100",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
