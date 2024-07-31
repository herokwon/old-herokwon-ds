import { useEffect, useRef, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';

import type { ToastMessage, ToastMessageConfig } from '../../types';
import { FEEDBACK_ICONS } from '../../data/constant';
import IconButton from './IconButton';

interface ToastMessageProps extends Pick<ToastMessageConfig, 'position'> {
  messages: ToastMessage[];
  closeMessage: (
    idToDelete: string,
    { position }: Pick<ToastMessageConfig, 'position'>,
  ) => void;
}

type ToastMessageContainerProps = ToastMessage &
  Pick<ToastMessageProps, 'position' | 'closeMessage'>;

const ToastMessageContainer = ({
  id,
  variant,
  message,
  duration,
  position,
  closeMessage,
}: ToastMessageContainerProps) => {
  const FeedbackIcon = FEEDBACK_ICONS[variant];
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const [restTime, setRestTime] = useState<number>(duration);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (restTime > 0) return;
    countdownRef.current && clearInterval(countdownRef.current);
    countdownRef.current = null;
  }, [restTime, id, position, closeMessage]);

  useEffect(() => {
    if (!countdownRef.current)
      countdownRef.current = setInterval(() => {
        setRestTime(prev => Math.max(0, prev - 10));
      }, 10);
  }, [duration]);

  return (
    <div
      key={id}
      className={`section-message--${variant} relative flex w-full max-w-[calc(100vw-(1rem*2))] overflow-hidden rounded-ms py-2 pl-2 pr-1`}
      onMouseEnter={() => {
        if (!countdownRef.current) return;

        setIsPaused(true);
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }}
      onMouseLeave={() => {
        if (countdownRef.current) return;

        setIsPaused(false);
        countdownRef.current = setInterval(() => {
          setRestTime(prev => Math.max(0, prev - 10));
        }, 10);
      }}
      onAnimationEnd={() => {
        if (restTime > 0) return;

        countdownRef.current && clearInterval(countdownRef.current);
        countdownRef.current = null;
        closeMessage(id, { position });
      }}
      style={{
        animation:
          restTime > 0 && restTime < duration
            ? undefined
            : `${
                position.endsWith('left')
                  ? 'show-up-left'
                  : position.endsWith('right')
                    ? 'show-up-right'
                    : position.startsWith('top')
                      ? 'show-up-top'
                      : 'show-up-bottom'
              } 200ms ease-in-out ${restTime === 0 ? 'reverse' : 'normal'} forwards`,
      }}
    >
      <span className="my-[0.1875rem] mr-2 h-full w-max">
        <FeedbackIcon className="h-sm" />
      </span>
      <p
        className={`whitespace-pre text-sm font-semibold ${
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
        icon={FaXmark}
        size="sm"
        spacing="none"
        className="ml-2"
        onClick={() => {
          countdownRef.current && clearInterval(countdownRef.current);
          countdownRef.current = null;
          closeMessage(id, { position });
        }}
      />
      <div
        className="progress-bar absolute bottom-0 left-0 h-2 w-full"
        style={{
          animation: `toast-progress ${duration}ms linear forwards`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      />
    </div>
  );
};

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
      {messages.map(({ id, ...props }) => {
        return (
          <ToastMessageContainer
            {...props}
            key={id}
            id={id}
            position={position}
            closeMessage={closeMessage}
          />
        );
      })}
    </div>
  );
}
