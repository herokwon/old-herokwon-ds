import { useEffect, useState } from 'react';

import type { ElementBaseSize, ElementStatus } from '../../types';

import LoadableElement from '../LoadableElement';
import ButtonGroup from './ButtonGroup';
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
      <ButtonGroup
        focusMode={false}
        className="!w-full gap-1.5 rounded-ms border-[0.1rem] border-light-secondary p-1.5 dark:border-dark-secondary"
      >
        {tabItems.map((tabItem, index) => (
          <TextButton
            key={index}
            label={tabItem.heading}
            variant={index === selectedIndex ? 'primary' : 'secondary'}
            size={size}
            onClick={() => setSelectedIndex(index)}
            className={`w-full ${
              index === selectedIndex
                ? 'pointer-events-none font-semibold'
                : 'not-hover:opacity-normal'
            }`}
          />
        ))}
      </ButtonGroup>
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
