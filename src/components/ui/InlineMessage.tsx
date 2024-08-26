import type { ElementBaseSize } from '../../types';

import type { FeedbackVariant } from '../../types/ui';

import { FEEDBACK_ICONS } from '../../data/constants';

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
  const FeedbackIcon = FEEDBACK_ICONS[variant];

  return (
    <div
      {...props}
      className={`inline-message--${variant} flex w-full bg-transparent ${props.className ?? ''}`}
    >
      <span
        className={`h-full w-max ${
          size === 'lg'
            ? 'my-1'
            : size === 'sm'
              ? 'my-[0.125rem]'
              : 'my-[0.1875rem]'
        } ${size === 'sm' ? 'mr-1.5' : 'mr-2'}`}
      >
        <FeedbackIcon
          className={size === 'lg' ? 'h-base' : size === 'sm' ? 'h-xs' : 'h-sm'}
        />
      </span>
      <p
        className={`w-full ${
          size === 'lg' ? 'text-base' : size === 'sm' ? 'text-xs' : 'text-sm'
        } break-all`}
      >
        {heading.length > 0 && (
          <strong
            className={`${size === 'sm' ? 'mr-1.5' : 'mr-2'} whitespace-nowrap`}
          >
            {heading}
          </strong>
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
