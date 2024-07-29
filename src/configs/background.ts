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
  'light-primary': '#FFFFFF',
  'light-secondary': '#E2E8F0',
  'light-tertiary': '#CBD5E1',
  'dark-primary': '#121212',
  'dark-secondary': '#1E293B',
  'dark-tertiary': '#334155',
  ...customBgFeedbackColor,
};
