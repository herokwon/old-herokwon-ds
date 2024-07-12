export const customWidth: { [key: string]: string } = {
  ...Object.fromEntries(Array.from({ length: 2001 }, (_, i) => [i, `${i}px`])),
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
};

export const customHeight: { [key: string]: string } = {
  ...Object.fromEntries(Array.from({ length: 2001 }, (_, i) => [i, `${i}px`])),
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
};
