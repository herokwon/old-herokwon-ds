import { customBgColor, customBgFeedbackColor } from './background';
import { customBoxShadow, customOpacity } from './effect';
import { customHeight, customWidth } from './size';
import { customTextColor } from './typography';

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
    ...Object.fromEntries(
      Object.entries(customBgColor).filter(
        item => !(item[0] in customBgFeedbackColor),
      ),
    ),
    brown: {
      50: '#fdf8f6',
      100: '#f2e8e5',
      200: '#eaddd7',
      300: '#e0cec7',
      400: '#d2bab0',
      500: '#bfa094',
      600: '#a18072',
      700: '#977669',
      800: '#846358',
      900: '#43302b',
    },
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
