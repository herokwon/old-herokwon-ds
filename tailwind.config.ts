import type { Config } from 'tailwindcss/types/config';

import { tailwindExtendTheme, tailwindCustomPlugin } from './src/configs';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: tailwindExtendTheme,
  },
  plugins: [tailwindCustomPlugin],
};

export default config;
