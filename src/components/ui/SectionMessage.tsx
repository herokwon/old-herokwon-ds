import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

import type { FeedbackAction } from '../../types/ui';

import ButtonGroup from './ButtonGroup';
import FeedbackIcon from './FeedbackIcon';
import Heading from './Heading';
import Icon from './Icon';
import InlineMessage from './InlineMessage';
import TextButton from './TextButton';

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
      className={`section-message--${variant} flex w-full items-start rounded-ms px-4 py-3 shadow-sm group ${
        !!props.isHidable ? 'cursor-pointer' : ''
      } ${restProps.className ?? ''}`}
      onClick={() => props.isHidable && setIsHidden(prev => !prev)}
    >
      <FeedbackIcon
        variant={variant}
        size={size === 'lg' ? 'xl' : size === 'sm' ? 'md' : 'lg'}
        className={`mr-3 ${size === 'md' ? 'my-[0.3125rem]' : 'my-1'}`}
      />
      <div className={`my-auto w-full ${isHidden ? 'line-clamp-1' : ''}`}>
        {heading.length > 0 && (
          <Heading
            as="h2"
            className={
              size === 'lg'
                ? 'text-xl'
                : size === 'sm'
                  ? 'text-base'
                  : 'text-lg'
            }
          >
            {heading}
          </Heading>
        )}
        <div
          className={`${
            size === 'lg' ? 'text-lg' : size === 'sm' ? 'text-sm' : 'text-base'
          } ${heading.length > 0 ? 'opacity-normal' : ''}`}
        >
          {children}
        </div>
        {actions.length > 0 && (
          <ButtonGroup focusMode={false} className="mt-4 justify-end">
            {actions.map(action => (
              <TextButton
                {...action}
                key={action.id}
                variant={
                  variant !== 'default' &&
                  variant !== 'info' &&
                  action.variant === 'primary'
                    ? variant
                    : (action.variant ?? 'secondary')
                }
                size={size}
                className={
                  action.variant === 'secondary' ? 'hover:!bg-transparent' : ''
                }
                onClick={e => {
                  e.stopPropagation();
                  action.onClick && action.onClick(e);
                }}
              />
            ))}
          </ButtonGroup>
        )}
      </div>
      {props.isHidable && (
        <Icon
          icon={FaChevronDown}
          size={size === 'lg' ? 'md' : size === 'sm' ? 'xs' : 'sm'}
          spacing="none"
          className={`ml-2 ${size === 'md' ? 'my-[0.4375rem]' : 'my-1.5'} ${
            isHidden
              ? 'opacity-off group-hover:opacity-normal'
              : 'rotate-180 opacity-normal'
          } transition-all hover:!bg-transparent`}
        />
      )}
    </section>
  );
}
