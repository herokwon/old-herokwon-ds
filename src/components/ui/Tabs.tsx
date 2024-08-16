import { useEffect, useState } from 'react';

import type { AlignmentX, ElementBaseSize, ElementStatus } from '../../types';

import LoadableElement from '../LoadableElement';
import TextButton from './TextButton';

interface TabItem {
  heading: string;
  content?: React.ReactNode;
}

interface TabsProps
  extends Omit<ElementStatus, 'isSelected'>,
    React.ComponentPropsWithoutRef<'div'> {
  defaultSelectedIndex?: number;
  size?: ElementBaseSize;
  alignX?: AlignmentX;
  tabItems: TabItem[];
  onChangeSelectedIndex?: (index: number) => void;
}

export default function Tabs({
  defaultSelectedIndex = 0,
  size = 'md',
  alignX = 'left',
  tabItems,
  onChangeSelectedIndex,
  ...props
}: TabsProps) {
  const { isDisabled = false, isLoading = false, ...restProps } = props;
  const [selectedIndex, setSelectedIndex] =
    useState<number>(defaultSelectedIndex);

  useEffect(() => {
    onChangeSelectedIndex?.(selectedIndex);
  }, [selectedIndex, onChangeSelectedIndex]);

  return (
    <div
      {...restProps}
      className={`w-full space-y-2 ${restProps.className ?? ''}`}
    >
      <div
        className={`flex w-full ${
          alignX === 'left'
            ? 'justify-start'
            : alignX === 'right'
              ? 'justify-end'
              : 'justify-center'
        } relative items-center after:absolute after:left-0 after:top-full after:z-0 after:h-2 after:w-full after:rounded-full after:bg-light-secondary after:content-[''] after:dark:bg-dark-secondary`}
      >
        {tabItems.map((tabItem, index) => (
          <TextButton
            key={index}
            label={tabItem.heading}
            variant="secondary"
            size={size}
            onClick={() => setSelectedIndex(index)}
            className={`hover:!bg-transparent ${
              index === selectedIndex
                ? 'text-light-blue dark:text-dark-blue'
                : 'text-light/off hover:text-light/normal dark:text-dark/off dark:hover:text-dark/normal'
            } relative font-semibold transition-colors after:h-2 after:w-full after:rounded-full after:content-[""] ${
              index === selectedIndex
                ? 'after:bg-light-blue after:dark:bg-dark-blue'
                : 'after:bg-transparent hover:after:bg-black/normal dark:hover:after:bg-white/normal'
            } after:absolute after:left-0 after:top-full after:z-[1] after:transition-colors`}
          />
        ))}
      </div>
      <LoadableElement
        as="div"
        isActive={isLoading}
        className={`${isDisabled ? 'disabled' : ''} w-full`}
      >
        {tabItems[selectedIndex]?.content}
      </LoadableElement>
    </div>
  );
}
