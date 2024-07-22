import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

import type { FeedbackAction } from '../../types';
import { FEEDBACK_ICONS } from '../../data/constant';
import InlineMessage from './InlineMessage';
import TextButton from './TextButton';
import IconButton from './IconButton';
import Heading from './Heading';

type SectionMessageProps = Omit<
  React.ComponentPropsWithoutRef<typeof InlineMessage>,
  'message'
> & {
  actions?: FeedbackAction[];
} & (
    | {
        isHidable: true;
        defaultHidden?: boolean;
      }
    | {
        isHidable?: false;
      }
  );

export default function SectionMessage({
  children,
  heading = '',
  variant = 'default',
  size = 'md',
  actions = [],
  ...props
}: SectionMessageProps) {
  const FeedbackIcon = FEEDBACK_ICONS[variant];
  const restProps = Object.fromEntries(
    Object.entries(props).filter(
      prop => prop[0] !== 'isHidable' && prop[0] !== 'defaultHidden',
    ),
  );
  const [isHidden, setIsHidden] = useState<boolean>(
    !!props.isHidable && !!props.defaultHidden,
  );

  return (
    <section
      {...restProps}
      className={`section-message--${variant} group flex w-full max-w-[300px] items-start rounded-ms px-4 py-3 ${
        !!props.isHidable ? 'cursor-pointer' : ''
      } ${restProps.className ?? ''}`}
      onClick={() => props.isHidable && setIsHidden(prev => !prev)}
    >
      <span
        className={`w-max ${
          size === 'lg'
            ? 'my-1'
            : size === 'sm'
              ? 'my-[0.125rem]'
              : 'my-[0.1875rem]'
        } mr-4`}
      >
        <FeedbackIcon
          className={`${size === 'lg' ? 'w-xl' : size === 'sm' ? 'w-base' : 'w-lg'} !aspect-square h-max`}
        />
      </span>
      <div
        className={`my-auto w-full break-all ${
          size === 'lg' ? 'text-base' : size === 'sm' ? 'text-xs' : 'text-sm'
        } ${isHidden ? 'line-clamp-2' : ''}`}
      >
        {heading.length > 0 && (
          <Heading
            as="h2"
            className={`block w-full ${
              size === 'lg'
                ? 'text-lg'
                : size === 'sm'
                  ? 'text-sm'
                  : 'text-base'
            }`}
          >
            {heading}
          </Heading>
        )}
        <span className={heading.length > 0 ? 'opacity-normal' : ''}>
          {children}
        </span>
        {actions.length > 0 && (
          <div className="flex w-full items-center justify-end gap-x-1 pb-1 pt-4">
            {actions.map(action => (
              <TextButton
                {...action}
                key={action.id}
                size={size === 'lg' ? 'md' : 'sm'}
                onClick={e => {
                  e.stopPropagation();
                  action.onClick && action.onClick(e);
                }}
              />
            ))}
          </div>
        )}
      </div>
      {props.isHidable && (
        <IconButton
          icon={FaChevronDown}
          variant="secondary"
          size={size === 'lg' ? 'md' : size === 'sm' ? 'xs' : 'sm'}
          spacing="none"
          className={`ml-2 ${
            isHidden
              ? 'opacity-off group-hover:opacity-normal'
              : 'rotate-180 opacity-normal'
          } transition-all`}
        />
      )}
    </section>
  );
}
