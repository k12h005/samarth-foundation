/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F3ECDD',        /* page background, warm sandstone */
        surface: '#FDFBF6',   /* cards, warm white */
        primary: '#E08A2C',   /* marigold saffron — primary CTAs, accents */
        secondary: '#6B7F5E', /* muted sage green — secondary actions, icons */
        trust: '#5B7C99',     /* dusty slate blue — links, informational accents */
        text: '#3A332C',      /* warm charcoal-brown */
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Fraunces', 'serif'],
        body: ['var(--font-body)', 'Work Sans', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(58, 51, 44, 0.08)',
        'warm-md': '0 4px 20px rgba(58, 51, 44, 0.12)',
        'warm-lg': '0 8px 40px rgba(58, 51, 44, 0.16)',
      }
    },
  },
  plugins: [],
};
