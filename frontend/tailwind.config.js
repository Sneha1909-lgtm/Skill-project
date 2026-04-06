/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60a5fa',
          DEFAULT: '#2563eb', // Blue-600 (Trust)
          dark: '#1d4ed8',
        },
        secondary: {
          light: '#334155',
          DEFAULT: '#0f172a', // Slate-900 (Professional Dark)
          dark: '#020617',
        },
        success: '#10b981', // Emerald-500
        warning: '#f59e0b', // Amber-500
        error: '#f43f5e',   // Rose-500
        background: '#f8fafc', // Slate-50 (Clean White/Gray)
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'enterprise': '0 10px 15px -3px rgb(0 0 0 / 0.07), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
