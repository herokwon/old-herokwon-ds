import { useMemo, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

import type { FeedbackAction } from '../../types';
import InlineMessage from './InlineMessage';
import TextButton from './TextButton';
import IconButton from './IconButton';

type SectionMessageProps = React.ComponentPropsWithoutRef<
  typeof InlineMessage
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
  heading,
  message,
  variant = 'default',
  size = 'md',
  actions = [],
  ...props
}: SectionMessageProps) {
  const [isHidden, setIsHidden] = useState<boolean>(
    !!props.isHidable && !!props.defaultHidden,
  );

  const restProps = useMemo(
    () => ({
      ...Object.entries(props).filter(
        prop => prop[0] !== 'isHidable' && prop[0] !== 'defaultHidden',
      ),
    }),
    [props],
  );

  return (
    <section
      className={`section-message--${variant} w-full rounded-ms border px-4 py-3 shadow-md shadow-light-secondary dark:shadow-dark-secondary ${
        !!props.isHidable ? 'cursor-pointer' : ''
      } ${props.className ?? ''}`}
      onClick={() => setIsHidden(prev => !prev)}
    >
      <div
        className={`flex w-full ${isHidden ? 'items-center' : 'items-start'}`}
      >
        <InlineMessage
          {...restProps}
          heading={heading}
          message={message}
          variant={variant}
          size={size}
          className={`${
            !heading ? '' : size === 'sm' ? 'first:*:mr-2.5' : 'first:*:mr-3'
          } ${isHidden ? 'last:*:line-clamp-1' : ''}`}
        >
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
        </InlineMessage>
        {props.isHidable && (
          <IconButton
            icon={FaChevronDown}
            variant="secondary"
            size={size === 'lg' ? 'md' : size === 'sm' ? 'xs' : 'sm'}
            spacing="none"
            className={`${size === 'sm' ? 'ml-1.5' : 'ml-2'} ${
              isHidden
                ? 'opacity-off hover:opacity-normal'
                : 'rotate-180 opacity-normal'
            } transition-all`}
          />
        )}
      </div>
    </section>
  );
}
