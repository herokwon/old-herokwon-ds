import plugin from 'tailwindcss/plugin';

const customVariants = {
  'slider-thumb': ['&::-webkit-slider-thumb', '&::-moz-range-thumb'],
  'slider-track': ['&::-webkit-slider-runnable-track', '&::-moz-range-track'],
};

export default plugin(function ({ addBase, addVariant }) {
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
      pointerEvents: 'none',
    },

    // dialog
    'dialog[open]': {
      animation: 'modal-open 0.15s forwards',
    },
    'dialog.close': {
      animation: 'modal-close 0.15s forwards',
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
});
