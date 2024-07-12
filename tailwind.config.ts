import type { Config } from 'tailwindcss/types/config';

import tailwindExtendConfig from './src/configs';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: tailwindExtendConfig,
  },
  plugins: [],
};

export default config;
