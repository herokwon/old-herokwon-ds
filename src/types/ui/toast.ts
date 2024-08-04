import type { FeedbackVariant } from '../../types/ui';

import { TOAST_MESSAGES_POSITIONS } from '../../data/constant';

export type ToastMessageVariant = Exclude<FeedbackVariant, 'default'>;
export type ToastMessagePosition = (typeof TOAST_MESSAGES_POSITIONS)[number];

export interface ToastMessageConfig {
  position: ToastMessagePosition;
  duration?: number;
}

export interface ToastMessage
  extends Required<Pick<ToastMessageConfig, 'duration'>> {
  id: string;
  variant: ToastMessageVariant;
  message: string;
}
