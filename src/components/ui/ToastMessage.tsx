import { useEffect, useMemo, useRef, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';

import type { ToastMessage, ToastMessageConfig } from '../../types/ui';

import { FEEDBACK_ICONS, ICON_SIZE } from '../../data/constants';

import toast from '../Toast';
import IconButton from './IconButton';

interface ToastMessageProps extends Pick<ToastMessageConfig, 'position'> {
  messages: ToastMessage[];
  closeMessage: typeof toast.closeMessage;
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialDuration = useMemo(() => duration, []);

  const setCountdown = () => {
    if (countdownRef.current) return;

    countdownRef.current = setInterval(() => {
      setRestTime(prev => Math.max(0, prev - 10));
    }, 10);
  };
  const clearCountdown = () => {
    if (!countdownRef.current) return;

    countdownRef.current && clearInterval(countdownRef.current);
    countdownRef.current = null;
  };

  useEffect(() => {
    setCountdown();
  }, [duration]);

  useEffect(() => {
    restTime === 0 && clearCountdown();
  }, [restTime]);

  useEffect(() => {
    toast.updateDuration({
      id,
      position,
      duration: restTime,
    });
  }, [id, position, restTime]);

  return (
    <div
      key={id}
      className={`section-message--${variant} relative flex w-full max-w-[calc(100vw-(1rem*2))] gap-x-2 overflow-hidden rounded-ms p-2 pr-1`}
      onMouseEnter={() => {
        setIsPaused(true);
        clearCountdown();
      }}
      onMouseLeave={() => {
        setIsPaused(false);
        setCountdown();
      }}
      onAnimationEnd={() => {
        if (restTime > 0) return;

        clearCountdown();
        closeMessage({ id, position });
      }}
      style={{
        animation:
          restTime > 0
            ? undefined
            : `${
                position.endsWith('left')
                  ? 'show-up-left'
                  : position.endsWith('right')
                    ? 'show-up-right'
                    : position.startsWith('top')
                      ? 'show-up-top'
                      : 'show-up-bottom'
              } 200ms ease-in-out reverse forwards`,
      }}
    >
      <span className="my-0.5 h-full w-max">
        <FeedbackIcon size={ICON_SIZE.md} />
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
        variant="secondary"
        size="sm"
        spacing="compact"
        className="my-0.5 ml-2"
        onClick={() => {
          clearCountdown();
          closeMessage({ id, position });
        }}
      />
      <div
        className="progress-bar absolute bottom-0 left-0 h-2 w-full"
        style={{
          animation: `toast-progress 4s linear forwards`,
          animationDelay: `-${4000 - initialDuration}ms`,
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
