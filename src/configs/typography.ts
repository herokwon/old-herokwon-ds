export const customTextFeedbackColor: { [key: string]: string } = {
  'feedback-light-red': '#991B1B',
  'feedback-light-blue': '#1E40AF',
  'feedback-light-green': '#166534',
  'feedback-light-yellow': '#854D0E',
  'feedback-dark-red': '#FECACA',
  'feedback-dark-blue': '#BFDBFE',
  'feedback-dark-green': '#BBF7D0',
  'feedback-dark-yellow': '#FEF08A',
};

export const customTextColor: { [key: string]: string } = {
  light: '#000000',
  dark: '#FFFFFF',
  ...customTextFeedbackColor,
};
