import { useEffect, useState } from 'react';

import type { ElementBaseSize, ElementStatus } from '../../types';

import LoadableElement from '../LoadableElement';
import ButtonGroup from './ButtonGroup';
import TextButton from './TextButton';

interface TabItem extends Omit<ElementStatus, 'isSelected'> {
  heading: string;
  content?: React.ReactNode;
}

interface TabsProps extends React.ComponentPropsWithoutRef<'div'> {
  defaultSelectedIndex?: number;
  size?: ElementBaseSize;
  tabItems: TabItem[];
  onChangeSelectedIndex?: (index: number) => void;
}

export default function Tabs({
  defaultSelectedIndex = 0,
  size = 'md',
  tabItems,
  onChangeSelectedIndex,
  ...props
}: TabsProps) {
  const [selectedIndex, setSelectedIndex] =
    useState<number>(defaultSelectedIndex);

  useEffect(() => {
    onChangeSelectedIndex?.(selectedIndex);
  }, [selectedIndex, onChangeSelectedIndex]);

  return (
    <div {...props} className={`w-full ${props.className ?? ''}`}>
      <ButtonGroup
        focusMode={false}
        className="!w-full gap-2 border-b border-light-secondary px-2 shadow-[0_4px_6px_-4px] shadow-light-tertiary dark:border-dark-secondary dark:shadow-dark-tertiary"
      >
        {tabItems.map((tabItem, index) => (
          <TextButton
            key={index}
            isDisabled={tabItem.isDisabled}
            label={tabItem.heading}
            variant="secondary"
            size={size}
            onClick={() => setSelectedIndex(index)}
            className={`w-full rounded-b-none border-b-2 py-1 hover:!bg-transparent ${
              tabItem.isDisabled
                ? 'border-b-transparent !opacity-25'
                : index === selectedIndex
                  ? 'pointer-events-none border-b-light-blue font-semibold text-light-blue dark:border-b-dark-blue dark:text-dark-blue'
                  : 'hover:border-black/normal hover:opacity-normal not-hover:border-transparent not-hover:opacity-off dark:hover:border-white/normal'
            }`}
          />
        ))}
      </ButtonGroup>
      <LoadableElement
        as="div"
        isActive={tabItems[selectedIndex]?.isLoading || false}
        className={`${
          tabItems[selectedIndex]?.isDisabled ? 'disabled' : ''
        } w-full px-2 py-4`}
      >
        {tabItems[selectedIndex]?.content}
      </LoadableElement>
    </div>
  );
}
