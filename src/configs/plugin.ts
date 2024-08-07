import plugin from 'tailwindcss/plugin';

const customVariants = {
  'slider-thumb': ['&::-webkit-slider-thumb', '&::-moz-range-thumb'],
  'slider-track': ['&::-webkit-slider-runnable-track', '&::-moz-range-track'],
  'not-open': ['&:not([open])'],
};

export default plugin(function ({
  addBase,
  addVariant,
  addUtilities,
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
    'table, th, td': {
      'border-bottom-width': '2px',
      'border-color': '#E2E8F0',

      '.dark table &': {
        'border-color': '#334155',
      },
    },
    table: {
      width: '100%',
      'border-collapse': 'collapse',
      '&.align-left th, &.align-left td': {
        'text-align': 'left',
      },
      '&.align-center th, &.align-center td': {
        'text-align': 'center',
      },
      '&.align-right th, &.align-right td': {
        'text-align': 'right',
      },
      '&.align-top th, &.align-top td': {
        'vertical-align': 'top',
      },
      '&.align-middle th, &.align-middle td': {
        'vertical-align': 'middle',
      },
      '&.align-bottom th, &.align-bottom td': {
        'vertical-align': 'bottom',
      },
      '& th, & td': {
        padding: '0.25rem 0.75rem',
      },
    },

    // input
    'input:autofill, input:autofill:hover, input:autofill:focus, input:autofill:active':
      {
        'box-shadow': '0 0 0 1000px white inset',
      },
    'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active':
      {
        '-webkit-box-shadow': '0 0 0 1000px white inset',
        '-webkit-text-fill-color': 'black',
      },
    '.dark input:autofill, .dark input:autofill:hover, .dark input:autofill:focus, .dark input:autofill:active':
      {
        'box-shadow': '0 0 0 1000px #1e293b inset',
      },
    '.dark input:-webkit-autofill, .dark input:-webkit-autofill:hover, .dark input:-webkit-autofill:focus, .dark input:-webkit-autofill:active':
      {
        '-webkit-box-shadow': '0 0 0 1000px #1e293b inset',
        '-webkit-text-fill-color': 'white',
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
  });

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
