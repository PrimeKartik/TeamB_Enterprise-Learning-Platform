/** @type {import('tailwindcss').Config} */

// Lets a color be theme-swappable via CSS variables while still supporting
// Tailwind's opacity modifiers (e.g. bg-base/60, text-primary/50).
function withOpacity(rgbVariable) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${rgbVariable}), ${opacityValue})`
    }
    return `rgb(var(${rgbVariable}))`
  }
}

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: withOpacity('--color-base-rgb'),
        panel: withOpacity('--color-panel-rgb'),
        panel2: withOpacity('--color-panel2-rgb'),
        primary: withOpacity('--color-primary-rgb'),
        primary2: withOpacity('--color-primary2-rgb'),
        accent: withOpacity('--color-accent-rgb'),
        muted: withOpacity('--color-muted-rgb'),
        heading: withOpacity('--color-heading-rgb'),
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)',
      },
    },
  },
  plugins: [],
}
