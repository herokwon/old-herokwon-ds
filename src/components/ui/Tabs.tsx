import { forwardRef } from 'react';

import type { AlignmentX, ElementBaseSize } from '../../types';
import TextButton from './TextButton';

interface TabItem {
  index: number;
  heading: string;
  content: React.ReactNode;
}

interface TabsProps extends React.ComponentPropsWithoutRef<'div'> {
  size?: ElementBaseSize;
  alignX?: AlignmentX;
  tabItems: TabItem[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    size = 'sm',
    alignX = 'left',
    tabItems,
    selectedIndex,
    setSelectedIndex,
    ...props
  },
  ref,
) {
  return (
    <div {...props} ref={ref} className={`w-full ${props.className ?? ''}`}>
      <div
        className={`flex w-full ${
          alignX === 'left'
            ? 'justify-start'
            : alignX === 'right'
              ? 'justify-end'
              : 'justify-center'
        } relative items-center after:absolute after:left-0 after:top-full after:z-0 after:h-2 after:w-full after:rounded-full after:bg-light-secondary after:content-[''] after:dark:bg-dark-secondary`}
      >
        {tabItems.map(tabItem => (
          <TextButton
            key={tabItem.index}
            label={tabItem.heading}
            variant="secondary"
            size={size}
            onClick={() => setSelectedIndex(tabItem.index)}
            className={`hover:!bg-transparent ${
              tabItem.index === selectedIndex
                ? 'text-light-blue dark:text-dark-blue'
                : 'text-light/off hover:text-light/normal dark:text-dark/off dark:hover:text-dark/normal'
            } relative font-semibold transition-colors after:h-2 after:w-full after:rounded-full after:content-[""] ${
              tabItem.index === selectedIndex
                ? 'after:bg-light-blue after:dark:bg-dark-blue'
                : 'after:bg-transparent hover:after:bg-black/off dark:hover:after:bg-white/off'
            } after:absolute after:left-0 after:top-full after:z-[1] after:transition-colors`}
          />
        ))}
      </div>
      <div className="my-4 w-full">
        {tabItems.find(tabItem => tabItem.index === selectedIndex)?.content}
      </div>
    </div>
  );
});

export default Tabs;
