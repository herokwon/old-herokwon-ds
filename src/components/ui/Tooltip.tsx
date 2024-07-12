import { useEffect, useState } from 'react';

import Dropdown from './Dropdown';

interface TooltipProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Dropdown>,
    'children' | 'isOpen' | 'setIsOpen'
  > {
  content: string;
}

export default function Tooltip({
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
    <Dropdown
      {...props}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="tooltip first:*:last:*:shadow-md"
    >
      <p
        className={`px-1 ${
          size === 'lg' ? 'text-base' : size === 'sm' ? 'text-xs' : 'text-sm'
        } whitespace-pre`}
      >
        {activeContent}
      </p>
    </Dropdown>
  );
}
