import type { Config } from "tailwindcss/types/config";

const width: { [key: string]: string } = {
  ...Object.fromEntries(Array.from({ length: 2001 }, (_, i) => [i, `${i}px`])),
  'xs': '0.75rem',
  'sm': '0.875rem',
  'base': '1rem',
  'lg': '1.125rem',
  'xl': '1.25rem',
};
const height: { [key: string]: string } = {
  ...Object.fromEntries(Array.from({ length: 2001 }, (_, i) => [i, `${i}px`])),
  'xs': '0.75rem',
  'sm': '0.875rem',
  'base': '1rem',
  'lg': '1.125rem',
  'xl': '1.25rem',
};
const customColor: { [key: string]: string } = {
  'light-red': '#ef4444',
  'light-blue': '#3B82F6',
  'light-green': '#22C55E',
  'light-yellow': '#FACC15',
  'dark-red': '#DC2626',
  'dark-blue': '#2563EB',
  'dark-green': '#16A34A',
  'dark-yellow': '#EAB308',
};
const textFeedbackColor: { [key: string]: string } = {
  'feedback-light-red': '#991B1B',
  'feedback-light-green': '#166534',
  'feedback-dark-red': '#FECACA',
  'feedback-dark-green': '#BBF7D0',
};
const bgFeedbackColor: { [key: string]: string } = {
  'feedback-light-red': '#FEE2E2',
  'feedback-light-blue': '#DBEAFE',
  'feedback-light-green': '#DCFCE7',
  'feedback-light-yellow': '#FEF9C3',
  'feedback-dark-red': '#450A0A',
  'feedback-dark-blue': '#172554',
  'feedback-dark-green': '#052E16',
  'feedback-dark-yellow': '#422006',
};
const textColor: { [key: string]: string } = {
  'light': '#000000',
  'dark': '#ffffff',
  ...textFeedbackColor,
};
const bgColor: { [key: string]: string } = {
  'light-primary': '#ffffff',
  'light-secondary': '#e2e8f0',
  'light-tertiary': '#cbd5e1',
  'dark-primary': '#121212',
  'dark-secondary': '#1e293b',
  'dark-tertiary': '#475569',
  ...bgFeedbackColor,
};
const boxShadow: { [key: string]: string } = {
  'primary-light': '0 0.2rem 1rem rgba(18, 18, 18, 0.36)',
  'primary-dark': '0 0.2rem 1rem rgba(0, 0, 0, 0.36)',
};
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
      textColor: {
        ...textColor,
        ...customColor,
      },
      textDecorationColor: {
        ...customColor,
      },
      borderRadius: {
        'ms': '0.25rem',
      },
      borderColor: {
        ...bgColor,
        ...customColor,
      },
      backgroundColor: {
        ...bgColor,
        ...customColor,
      },
      boxShadow: boxShadow,
      boxShadowColor: {
        ...bgColor,
        ...customColor,
      },
      opacity: opacity,
    }
  },
  plugins: [],
};

export default config;