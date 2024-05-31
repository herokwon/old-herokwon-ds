import type { Config } from "tailwindcss/types/config";

const width: { [key: string]: string } = Object.fromEntries(Array.from({ length: 2001 }, (_, i) => [i, `${i}px`]));
const height: { [key: string]: string } = Object.fromEntries(Array.from({ length: 2001 }, (_, i) => [i, `${i}px`]));
const textColor: { [key: string]: string } = {
  'light': '#000000',
  'dark': '#ffffff',
};
const bgColor: { [key: string]: string } = {
  'light-primary': '#ffffff',
  'light-secondary': '#e2e8f0',
  'light-tertiary': '#cbd5e1',
  'dark-primary': '#121212',
  'dark-secondary': '#1e293b',
  'dark-tertiary': '#475569',
};
const boxShadow: { [key: string]: string } = {
  'light-primary': '0 0.2rem 1rem rgba(18, 18, 18, 0.36)',
  'dark-primary': '0 0.2rem 1rem rgba(0, 0, 0, 0.36)',
};
const boxShadowColor: { [key: string]: string } = Object.fromEntries(Object.entries(bgColor).filter((entry) => !entry[0].includes('primary')))
const opacity: { [key: string]: string } = {
  ...Object.fromEntries([...Array.from({ length: 101 }, (_, i) => [i, i * 0.01])]),
  'bold': '0.87',
  'normal': '0.6',
  'off': '0.38',
};

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      width: width,
      height: height,
      textColor: textColor,
      borderRadius: {
        'ms': '0.25rem',
      },
      borderColor: bgColor,
      backgroundColor: bgColor,
      boxShadow: boxShadow,
      boxShadowColor: boxShadowColor,
      opacity: opacity,
    }
  },
  plugins: [],
};

export default config;