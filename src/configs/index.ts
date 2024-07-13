import { customWidth, customHeight } from './size';
import { customTextColor } from './typography';
import { customBoxShadow, customOpacity } from './effect';
import { customBgColor } from './background';

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

export const tailwindExtendTheme = {
  width: customWidth,
  height: customHeight,
  colors: {
    ...customColor,
  },
  textColor: {
    ...customTextColor,
    ...customColor,
  },
  textDecorationColor: {
    ...customColor,
  },
  borderRadius: {
    ms: '0.25rem',
  },
  borderColor: {
    ...customBgColor,
    ...customColor,
  },
  backgroundColor: {
    ...customBgColor,
    ...customColor,
  },
  boxShadow: customBoxShadow,
  boxShadowColor: {
    ...customBgColor,
    ...customColor,
  },
  opacity: customOpacity,
};

export { default as tailwindCustomPlugin } from './plugin';
