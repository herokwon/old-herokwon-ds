import plugin from 'tailwindcss/plugin';

const customVariants: { [key: string]: string | string[] } = {
  // scrollbar
  scrollbar: '&::-webkit-scrollbar',
  'scrollbar-thumb': '&::-webkit-scrollbar-thumb',
  'scrollbar-track': '&::-webkit-scrollbar-track',

  // range
  'slider-thumb': ['&::-webkit-slider-thumb', '&::-moz-range-thumb'],
  'slider-track': ['&::-webkit-slider-runnable-track', '&::-moz-range-track'],

  // progress
  'progress-bar': '&::-webkit-progress-bar',
  'progress-value': '&::-webkit-progress-value',

  // not-()
  'not-open': '&:not([open])',
  'not-disabled': '&:not(:disabled)',
  'not-hover': '&:not(:hover)',

  // group-() & peer-()
  'group-not-disabled': '.group:not(:disabled) &',
  'peer-not-disabled': '.peer:not(:disabled) ~ &',

  // size
  xs: '@media (min-width: 512px)',
  'max-xs': '@media not all and (min-width: 512px)',
};

export default plugin(function ({
  addBase,
  addVariant,
  addUtilities,
  matchVariant,
  matchUtilities,
}) {
  addBase({
    // heading
    h1: {
      'font-size': '1.6rem',
      'font-weight': '800',
    },
    h2: {
      'font-size': '1.48rem',
      'font-weight': '700',
    },
    h3: {
      'font-size': '1.36rem',
      'font-weight': '700',
    },
    h4: {
      'font-size': '1.24rem',
      'font-weight': '700',
    },
    h5: {
      'font-size': '1.12rem',
      'font-weight': '700',
    },
    h6: {
      'font-size': '1rem',
      'font-weight': '700',
    },

    // button
    'button:disabled': {
      cursor: 'not-allowed',
      opacity: '0.38',
    },
    'button:disabled > *': {
      pointerEvents: 'none',
    },

    // table
    table: {
      width: '100%',
      'border-collapse': 'collapse',
      '& th, & td': {
        padding: '0.25rem 1rem',
        'border-bottom-width': '2px',
        'border-color': '#E2E8F0',
        '.dark &': {
          'border-color': '#1E293B',
        },
      },
      '& th': {
        'background-color': '#E2E8F0',
        '.dark &': {
          'background-color': '#1E293B',
        },
      },
    },

    // input
    input: {
      'background-color': 'transparent',
    },
    'input:autofill, input:autofill:hover, input:autofill:focus, input:autofill:active':
      {
        'box-shadow': '0 0 0 1000px white inset !important',
      },
    'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active':
      {
        '-webkit-box-shadow': '0 0 0 1000px white inset !important',
        '-webkit-text-fill-color': 'black !important',
      },
    '.dark input:autofill, .dark input:autofill:hover, .dark input:autofill:focus, .dark input:autofill:active':
      {
        'box-shadow': '0 0 0 1000px #121212 inset !important',
      },
    '.dark input:-webkit-autofill, .dark input:-webkit-autofill:hover, .dark input:-webkit-autofill:focus, .dark input:-webkit-autofill:active':
      {
        '-webkit-box-shadow': '0 0 0 1000px #121212 inset !important',
        '-webkit-text-fill-color': 'white !important',
      },
    'input[type="range"]': {
      height: '4px',
      width: '100%',
      cursor: 'pointer',
      appearance: 'none',
      'border-width': '1px',
      'border-radius': '9999px',
      outline: '2px solid transparent',
      'outline-offset': '2px',
    },
    'input[type="range"]::-webkit-slider-runnable-track': {
      'margin-left': '-0.375rem',
      'margin-right': '-0.375rem',
    },
    'input[type="range"]::-moz-range-track': {
      'margin-left': '-0.375rem',
      'margin-right': '-0.375rem',
    },
    'input[type="range"]::-webkit-slider-thumb': {
      'aspect-ratio': '1 / 1',
      width: '0.75rem',
      '-webkit-appearance': 'none',
      'border-radius': '9999px',
    },
    'input[type="range"]::-moz-range-thumb': {
      'aspect-ratio': '1 / 1',
      width: '0.75rem',
      '-webkit-appearance': 'none',
      'border-radius': '9999px',
    },

    // pre, code
    'pre[class*="language-"], code[class*="language-"]': {
      'text-shadow': '0 1px rgba(0, 0, 0, 0.3)',
      'text-align': 'left',
      'font-size': '1rem',
      'line-height': '1.5',
      'font-family':
        'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
      'white-space': 'pre',
      'word-spacing': 'normal',
      'word-break': 'normal',
      'word-wrap': 'normal',
      color: '#f8f8f2',
      'background-image': 'none',

      '-moz-tab-size': '4',
      '-o-tab-size': '4',
      'tab-size': '4',

      '-webkit-hyphens': 'none',
      '-moz-hyphens': 'none',
      '-ms-hyphens': 'none',
      hyphens: 'none',
    },
    'pre[class*="language-"]': {
      padding: '0',
      margin: '0',
    },
    'code[class*="language-"]': {
      width: '100%',
      padding: '0.5rem 1rem',
      'box-sizing': 'content-box',
      'background-color': '#1E293B',
    },
  });

  matchVariant('is', value => `&:is(${value})`);
  matchVariant('not', value => `&:not(${value})`);

  Object.entries(customVariants).forEach(([name, definition]) => {
    addVariant(name, definition);
  });

  matchUtilities({
    'bg-underline': value => ({
      'background-image': `linear-gradient(to right, var(--tw-gradient-stops))`,
      'background-size': `0% ${value}`,
      'background-repeat': 'no-repeat',
      'background-position': '0 100%',
      transition: 'background-size 150ms linear',
      '&:hover': {
        'background-size': `100% ${value}`,
      },
      '&.active': {
        'background-size': `100% ${value}`,
      },
    }),
    'group-bg-underline': value => ({
      'background-image': `linear-gradient(to right, var(--tw-gradient-stops))`,
      'background-size': `0% ${value}`,
      'background-repeat': 'no-repeat',
      'background-position': '0 100%',
      transition: 'background-size 150ms linear',
      '.group:hover &': {
        'background-size': `100% ${value}`,
      },
      '&.active': {
        'background-size': `100% ${value}`,
      },
    }),
    'peek-bg-underline': value => ({
      'background-image': `linear-gradient(to right, var(--tw-gradient-stops))`,
      'background-size': `0% ${value}`,
      'background-repeat': 'no-repeat',
      'background-position': '0 100%',
      transition: 'background-size 150ms linear',
      '.peek:hover ~ &': {
        'background-size': `100% ${value}`,
      },
      '&.active': {
        'background-size': `100% ${value}`,
      },
    }),
  });

  addUtilities({
    '.x-scrollbar': {
      'overflow-x': 'auto',
      '&::-webkit-scrollbar': {
        width: '100%',
        height: '7px',
      },
      '&::-webkit-scrollbar-thumb': {
        cursor: 'pointer',
        'border-radius': '9999px',
        'background-color': '#3B82F6',
      },
      '.dark &::-webkit-scrollbar-thumb': {
        'background-color': '#2563EB',
      },
      '&::-webkit-scrollbar-track': {
        cursor: 'pointer',
        'background-color': 'transparent',
      },
    },
    '.y-scrollbar': {
      'overflow-y': 'auto',
      '&::-webkit-scrollbar': {
        width: '7px',
        height: '100%',
      },
      '&::-webkit-scrollbar-thumb': {
        cursor: 'pointer',
        'border-radius': '9999px',
        'background-color': '#3B82F6',
      },
      '.dark &::-webkit-scrollbar-thumb': {
        'background-color': '#2563EB',
      },
      '&::-webkit-scrollbar-track': {
        cursor: 'pointer',
        'background-color': 'transparent',
      },
    },
    '.scrollbar-hide': {
      '-ms-overflow-style': 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    ...Object.fromEntries(
      Array.from({ length: 30 }, (_, i) => {
        const index =
          i <= 12
            ? i
            : i <= 14
              ? 12 + 2 * (i - 12)
              : i <= 26
                ? 16 + 4 * (i - 14)
                : i <= 28
                  ? 64 + 8 * (i - 28)
                  : 96;

        return [
          `.bg-underline-${index}`,
          {
            'background-image': `linear-gradient(to right, var(--tw-gradient-stops))`,
            'background-size': `0% ${index === 0 ? '0px' : `${index / 4}rem`}`,
            'background-repeat': 'no-repeat',
            'background-position': '0 100%',
            transition: 'background-size 150ms linear',
            '&:hover': {
              'background-size': `100% ${index === 0 ? '0px' : `${index / 4}rem`}`,
            },
            '&.active': {
              'background-size': `100% ${index === 0 ? '0px' : `${index / 4}rem`}`,
            },
          },
        ];
      }),
    ),
    ...Object.fromEntries(
      Array.from({ length: 30 }, (_, i) => {
        const index =
          i <= 12
            ? i
            : i <= 14
              ? 12 + 2 * (i - 12)
              : i <= 26
                ? 16 + 4 * (i - 14)
                : i <= 28
                  ? 64 + 8 * (i - 28)
                  : 96;

        return [
          `.group-bg-underline-${index}`,
          {
            'background-image': `linear-gradient(to right, var(--tw-gradient-stops))`,
            'background-size': `0% ${index === 0 ? '0px' : `${index / 4}rem`}`,
            'background-repeat': 'no-repeat',
            'background-position': '0 100%',
            transition: 'background-size 150ms linear',
            '.group:hover &': {
              'background-size': `100% ${index === 0 ? '0px' : `${index / 4}rem`}`,
            },
            '&.active': {
              'background-size': `100% ${index === 0 ? '0px' : `${index / 4}rem`}`,
            },
          },
        ];
      }),
    ),
    ...Object.fromEntries(
      Array.from({ length: 30 }, (_, i) => {
        const index =
          i <= 12
            ? i
            : i <= 14
              ? 12 + 2 * (i - 12)
              : i <= 26
                ? 16 + 4 * (i - 14)
                : i <= 28
                  ? 64 + 8 * (i - 28)
                  : 96;

        return [
          `.peek-bg-underline-${index}`,
          {
            'background-image': `linear-gradient(to right, var(--tw-gradient-stops))`,
            'background-size': `0% ${index === 0 ? '0px' : `${index / 4}rem`}`,
            'background-repeat': 'no-repeat',
            'background-position': '0 100%',
            transition: 'background-size 150ms linear',
            '.peek:hover ~ &': {
              'background-size': `100% ${index === 0 ? '0px' : `${index / 4}rem`}`,
            },
            '&.active': {
              'background-size': `100% ${index === 0 ? '0px' : `${index / 4}rem`}`,
            },
          },
        ];
      }),
    ),
  });
});
