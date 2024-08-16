import { useEffect, useState } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

import type { ElementBaseSize, ElementBorderShape } from '../../types';

import IconButton from './IconButton';

interface PageIndicatorProps extends React.ComponentPropsWithoutRef<'div'> {
  totalPage: number;
  defaultSelectedIndex?: number;
  size?: ElementBaseSize;
  shape?: ElementBorderShape;
  onChangeSelectedIndex?: (index: number) => void;
}

const IndicatorRadiusSize: { [size in ElementBaseSize]: number } = {
  lg: 5,
  md: 4,
  sm: 3,
};

export default function PageIndicator({
  totalPage,
  defaultSelectedIndex = 0,
  size = 'md',
  shape = 'circle',
  onChangeSelectedIndex,
  ...props
}: PageIndicatorProps) {
  const [selectedIndex, setSelectedIndex] =
    useState<number>(defaultSelectedIndex);

  const onClickHandler = {
    prevButton: (): void => setSelectedIndex(prev => Math.max(0, prev - 1)),
    nextButton: (): void =>
      setSelectedIndex(prev => Math.min(prev + 1, totalPage - 1)),
  };

  useEffect(() => {
    onChangeSelectedIndex?.(selectedIndex);
  }, [selectedIndex, onChangeSelectedIndex]);

  return (
    <div
      {...props}
      className={`flex w-full items-center ${props.className ?? ''}`}
    >
      <IconButton
        isDisabled={selectedIndex === 0}
        icon={LuChevronLeft}
        size={size}
        shape={shape}
        variant="secondary"
        spacing="compact"
        onClick={onClickHandler.prevButton}
      />
      <div className="flex w-full items-center justify-center gap-x-2 px-4">
        {Array.from({ length: totalPage }, (_, i) => i).map((_, index) => (
          <svg
            key={index}
            className={`aspect-square rounded-full ${
              selectedIndex === index ? '' : 'cursor-pointer'
            } group`}
            onClick={() => setSelectedIndex(index)}
            style={{
              width: `${IndicatorRadiusSize[size] * 2}px`,
            }}
          >
            <circle
              cx={IndicatorRadiusSize[size]}
              cy={IndicatorRadiusSize[size]}
              r={IndicatorRadiusSize[size]}
              className={
                selectedIndex === index
                  ? 'fill-blue-500 dark:fill-blue-600'
                  : 'fill-[#e2e8f0] transition-all group-hover:fill-[#cbd5e1] dark:fill-[#1e293b] dark:group-hover:fill-[#475569]'
              }
            />
          </svg>
        ))}
      </div>
      <IconButton
        isDisabled={selectedIndex === totalPage - 1}
        icon={LuChevronRight}
        size={size}
        shape={shape}
        variant="secondary"
        spacing="compact"
        onClick={onClickHandler.nextButton}
      />
    </div>
  );
}
