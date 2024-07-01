export const customBoxShadow: { [key: string]: string } = {
    'primary-light': '0 0.2rem 1rem rgba(18, 18, 18, 0.36)',
    'primary-dark': '0 0.2rem 1rem rgba(0, 0, 0, 0.36)',
};

export const customOpacity: { [key: string]: string } = {
    ...Object.fromEntries([...Array.from({ length: 101 }, (_, i) => [i, i * 0.01])]),
    'bold': '0.87',
    'normal': '0.6',
    'off': '0.38',
};