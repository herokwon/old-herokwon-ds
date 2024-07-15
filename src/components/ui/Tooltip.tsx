import { useEffect, useState } from 'react';

import Dropdown from './Dropdown';

interface TooltipProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Dropdown.Wrapper>,
    'children' | 'isDisabled' | 'isOpen' | 'setIsOpen'
  > {
  content: string;
}

export default function Tooltip({
  position = 'bottom-center',
  size = 'md',
  content,
  ...props
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeContent, setActiveContent] = useState<string>(content);

  useEffect(() => {
    setActiveContent(content);
  }, [content]);

  return (
    <Dropdown.Wrapper
      {...props}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      position={position}
      className={`only:*:last:*:border-0 only:*:last:*:bg-light-secondary only:*:last:*:shadow-md only:*:last:*:dark:bg-dark-secondary ${props.className ?? ''}`}
    >
      <Dropdown.Container
        className={`after:absolute after:border-[0.5rem] after:border-transparent ${
          position.startsWith('top')
            ? 'after:bottom-0 after:border-b-0 after:border-t-light-secondary after:dark:border-t-dark-secondary'
            : position.startsWith('bottom')
              ? 'after:top-0 after:border-t-0 after:border-b-light-secondary after:dark:border-b-dark-secondary'
              : position.startsWith('left')
                ? 'after:right-0 after:border-r-0 after:border-l-light-secondary after:dark:border-l-dark-secondary'
                : 'after:left-0 after:border-l-0 after:border-r-light-secondary after:dark:border-r-dark-secondary'
        } ${
          position.endsWith('top')
            ? 'after:top-0 after:translate-y-3/4 after:border-y-[calc(0.5rem/2)]'
            : position.endsWith('bottom')
              ? 'after:bottom-0 after:-translate-y-3/4 after:border-y-[calc(0.5rem/2)]'
              : position.endsWith('left')
                ? 'after:left-0 after:translate-x-3/4 after:border-x-[calc(0.5rem/2)]'
                : position.endsWith('right')
                  ? 'after:right-0 after:-translate-x-3/4 after:border-x-[calc(0.5rem/2)]'
                  : position.endsWith('middle')
                    ? 'after:top-1/2 after:-translate-y-1/2 after:border-y-[calc(0.5rem/2)]'
                    : 'after:left-1/2 after:-translate-x-1/2 after:border-x-[calc(0.5rem/2)]'
        }`}
      >
        <p
          className={`px-1 ${
            size === 'lg' ? 'text-base' : size === 'sm' ? 'text-xs' : 'text-sm'
          } whitespace-pre`}
        >
          {activeContent}
        </p>
      </Dropdown.Container>
    </Dropdown.Wrapper>
  );
}
