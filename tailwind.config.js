/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        foreground: '#1E1E1E',
        muted: '#F4F4F5',
        'muted-foreground': '#71717A',
        primary: '#1E1E1E',
        'primary-foreground': '#FFFFFF',
        secondary: '#A9C9FF',
      }
    },
  },
  plugins: [],
}
