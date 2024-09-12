import type { ElementBaseSize } from '../../types';

import type { FeedbackVariant } from '../../types/ui';

import FeedbackIcon from './FeedbackIcon';

interface InlineMessageProps extends React.ComponentPropsWithoutRef<'div'> {
  heading?: string;
  message: React.ReactNode;
  variant?: FeedbackVariant;
  size?: ElementBaseSize;
}

export default function InlineMessage({
  heading = '',
  message,
  variant = 'default',
  size = 'md',
  ...props
}: InlineMessageProps) {
  return (
    <div
      {...props}
      className={`inline-message--${variant} flex w-full gap-x-2 bg-transparent ${props.className ?? ''}`}
    >
      <FeedbackIcon variant={variant} size={size} className="my-1" />
      <p
        className={`w-full ${
          size === 'lg' ? 'text-lg' : size === 'sm' ? 'text-sm' : 'text-base'
        } text-pretty break-all`}
      >
        {heading.length > 0 && (
          <strong className="mr-2 whitespace-nowrap">{heading}</strong>
        )}
        {typeof message === 'string' ? (
          <span className={heading.length > 0 ? 'opacity-normal' : ''}>
            {message}
          </span>
        ) : (
          message
        )}
      </p>
    </div>
  );
}
