export const customTextFeedbackColor: { [key: string]: string } = {
  'feedback-light-red': '#991B1B',
  'feedback-light-green': '#166534',
  'feedback-dark-red': '#FECACA',
  'feedback-dark-green': '#BBF7D0',
};

export const customTextColor: { [key: string]: string } = {
  light: '#000000',
  dark: '#ffffff',
  ...customTextFeedbackColor,
};
