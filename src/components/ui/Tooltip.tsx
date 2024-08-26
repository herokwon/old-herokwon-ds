import { useState } from 'react';

import type { Children } from '../../types';

import Popup from './Popup';

interface TooltipProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Popup>,
    'isOpen' | 'isLoading' | 'trigger' | 'onClose' | 'content'
  > {
  content: Children;
}

export default function Tooltip({
  children,
  position = 'bottom-center',
  content,
  ...props
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Popup
      {...props}
      isOpen={isOpen}
      position={position}
      trigger={children}
      onClose={() => setIsOpen(false)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={`only:*:last:*:border-0 only:*:last:*:bg-dark-tertiary only:*:last:*:text-dark only:*:last:*:shadow-md only:*:last:*:after:absolute only:*:last:*:after:border-[0.5rem] only:*:last:*:after:border-transparent ${
        position.startsWith('top')
          ? 'only:*:last:*:after:bottom-0 only:*:last:*:after:border-b-0 only:*:last:*:after:border-t-dark-tertiary'
          : position.startsWith('bottom')
            ? 'only:*:last:*:after:top-0 only:*:last:*:after:border-t-0 only:*:last:*:after:border-b-dark-tertiary'
            : position.startsWith('left')
              ? 'only:*:last:*:after:right-0 only:*:last:*:after:border-r-0 only:*:last:*:after:border-l-dark-tertiary'
              : 'only:*:last:*:after:left-0 only:*:last:*:after:border-l-0 only:*:last:*:after:border-r-dark-tertiary'
      } ${
        position.endsWith('top')
          ? 'only:*:last:*:after:top-0 only:*:last:*:after:translate-y-3/4 only:*:last:*:after:border-y-[calc((0.5rem/5)*3)]'
          : position.endsWith('bottom')
            ? 'only:*:last:*:after:bottom-0 only:*:last:*:after:-translate-y-3/4 only:*:last:*:after:border-y-[calc((0.5rem/5)*3)]'
            : position.endsWith('left')
              ? 'only:*:last:*:after:left-0 only:*:last:*:after:translate-x-3/4 only:*:last:*:after:border-x-[calc((0.5rem/5)*3)]'
              : position.endsWith('right')
                ? 'only:*:last:*:after:right-0 only:*:last:*:after:-translate-x-3/4 only:*:last:*:after:border-x-[calc((0.5rem/5)*3)]'
                : position.endsWith('middle')
                  ? 'only:*:last:*:after:top-1/2 only:*:last:*:after:-translate-y-1/2 only:*:last:*:after:border-y-[calc((0.5rem/5)*3)]'
                  : 'only:*:last:*:after:left-1/2 only:*:last:*:after:-translate-x-1/2 only:*:last:*:after:border-x-[calc((0.5rem/5)*3)]'
      } ${props.className ?? ''}`}
    >
      {content}
    </Popup>
  );
}
