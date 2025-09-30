import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'media', // This enables system preference detection
  theme: {
    extend: {
      colors: {
        'brand-primary-green': '#00A483',
        'brand-secondary-green': '#01C09A',
        'brand-orange': '#FF8701',
        'brand-purple': '#5401C0',
      },
      fontFamily: {
        'sentient': ['Sentient', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
