import { LuX } from 'react-icons/lu';

import type {
  ToastMessage,
  ToastMessageConfig,
  ToastMessagePosition,
} from '../../types';
import { FEEDBACK_ICONS } from '../../data/constant';
import IconButton from './IconButton';

interface ToastMessageProps {
  position: ToastMessagePosition;
  messages: ToastMessage[];
  closeMessage: (
    idToDelete: string,
    { position }: Pick<ToastMessageConfig, 'position'>,
  ) => void;
}

export default function ToastMessage({
  position,
  messages,
  closeMessage,
}: ToastMessageProps) {
  return (
    <div
      className={`fixed z-[300] m-2 space-y-2 ${
        position.startsWith('top')
          ? 'top-0'
          : position.startsWith('bottom')
            ? 'bottom-0'
            : 'top-1/2 -translate-y-1/2'
      } ${
        position.endsWith('left')
          ? 'left-0'
          : position.endsWith('right')
            ? 'right-0'
            : 'left-1/2 -translate-x-1/2'
      }`}
    >
      {messages.map(({ id, variant, message, duration }) => {
        const FeedbackIcon = FEEDBACK_ICONS[variant];

        return (
          <div
            key={id}
            className={`relative flex w-full max-w-[calc(100vw-(1rem*2))] overflow-hidden rounded-ms py-2 pl-2 pr-1 section-message--${variant}`}
          >
            <span className="my-[0.1875rem] mr-2 h-full w-max">
              <FeedbackIcon className="h-sm" />
            </span>
            <p
              className={`whitespace-pre text-sm font-medium ${
                variant === 'success'
                  ? 'text-feedback-light-green dark:text-feedback-dark-green'
                  : variant === 'danger'
                    ? 'text-feedback-light-red dark:text-feedback-dark-red'
                    : variant === 'warning'
                      ? 'text-feedback-light-yellow dark:text-feedback-dark-yellow'
                      : 'text-feedback-light-blue dark:text-feedback-dark-blue'
              }`}
            >
              {message}
            </p>
            <IconButton
              icon={LuX}
              size="sm"
              spacing="none"
              className="ml-2"
              onClick={() => closeMessage(id, { position })}
            />
            <div
              className="progress-bar absolute bottom-0 left-0 h-2 w-full"
              style={{
                animation: `toast-progress ${duration}ms linear forwards`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
