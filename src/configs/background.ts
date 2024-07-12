export const customBgFeedbackColor: { [key: string]: string } = {
  'feedback-light-red': '#FEE2E2',
  'feedback-light-blue': '#DBEAFE',
  'feedback-light-green': '#DCFCE7',
  'feedback-light-yellow': '#FEF9C3',
  'feedback-dark-red': '#450A0A',
  'feedback-dark-blue': '#172554',
  'feedback-dark-green': '#052E16',
  'feedback-dark-yellow': '#422006',
};

export const customBgColor: { [key: string]: string } = {
  'light-primary': '#ffffff',
  'light-secondary': '#e2e8f0',
  'light-tertiary': '#cbd5e1',
  'dark-primary': '#121212',
  'dark-secondary': '#1e293b',
  'dark-tertiary': '#475569',
  ...customBgFeedbackColor,
};
