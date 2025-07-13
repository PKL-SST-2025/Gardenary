/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite//*.js",
  ],
  theme: {
    extend: {
      height: {
      screen: '100vh',
      },
      fontFamily: {
        baloo: ['Baloo', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

