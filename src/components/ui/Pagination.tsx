import { useEffect, useMemo, useState } from 'react';
import {
  LuChevronFirst,
  LuChevronLast,
  LuChevronLeft,
  LuChevronRight,
} from 'react-icons/lu';

import type { ElementBaseSize, ElementBorderShape } from '../../types';

import ButtonGroup from './ButtonGroup';
import IconButton from './IconButton';
import TextButton from './TextButton';

interface PaginationProps extends React.ComponentPropsWithoutRef<'div'> {
  totalPage: number;
  pagePerIndex?: number;
  defaultSelectedPageNumber?: number;
  size?: ElementBaseSize;
  shape?: ElementBorderShape;
  onChangeSelectedPage?: (pageNumber: number) => void;
}

export default function Pagination({
  totalPage,
  pagePerIndex = 5,
  defaultSelectedPageNumber = 1,
  size = 'md',
  shape = 'square',
  onChangeSelectedPage,
  ...props
}: PaginationProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(
    defaultSelectedPageNumber - 1,
  );
  const viewedIndex = useMemo(
    () => Math.floor(selectedIndex / pagePerIndex),
    [selectedIndex, pagePerIndex],
  );

  const onClickHandler: { [key: string]: () => void } = {
    firstButton: () => setSelectedIndex(0),
    prevButton: () =>
      setSelectedIndex(prev => Math.max(0, prev - pagePerIndex)),
    nextButton: () =>
      setSelectedIndex(prev => Math.min(prev + pagePerIndex, totalPage - 1)),
    lastButton: () => setSelectedIndex(totalPage - 1),
  };

  useEffect(() => {
    onChangeSelectedPage?.(selectedIndex + 1);
  }, [selectedIndex, onChangeSelectedPage]);

  return (
    <div
      {...props}
      className={`flex flex-wrap items-center *:flex-wrap ${
        size === 'lg'
          ? 'gap-2'
          : size === 'sm'
            ? 'gap-1 *:gap-1'
            : 'gap-1.5 *:gap-1.5'
      } ${props.className ?? ''}`}
    >
      <ButtonGroup focusMode={false}>
        <IconButton
          isDisabled={viewedIndex === 0}
          icon={LuChevronFirst}
          size={size}
          shape={shape}
          onClick={onClickHandler.firstButton}
        />
        <IconButton
          isDisabled={viewedIndex === 0}
          icon={LuChevronLeft}
          size={size}
          shape={shape}
          onClick={onClickHandler.prevButton}
        />
      </ButtonGroup>
      <ButtonGroup focusMode={false}>
        {Array.from(
          {
            length: Math.min(
              totalPage - viewedIndex * pagePerIndex,
              pagePerIndex,
            ),
          },
          (_, i) => i,
        ).map((_, i) => {
          const pageIndex = viewedIndex * pagePerIndex + i;
          const pageNumberLength = (pageIndex + 1).toString().length;
          const isSelected = pageIndex === selectedIndex;

          return (
            <TextButton
              key={pageIndex}
              label={pageIndex + 1}
              variant={isSelected ? 'primary' : 'secondary'}
              size={size}
              shape={shape}
              onClick={() => setSelectedIndex(pageIndex)}
              className={`${
                size === 'lg'
                  ? 'w-[2.25rem]'
                  : size === 'sm'
                    ? 'w-[1.75rem]'
                    : 'w-[2rem]'
              } ${
                isSelected ? 'pointer-events-none' : ''
              } !aspect-square whitespace-nowrap`}
              style={{
                letterSpacing: `-${pageNumberLength * 0.03}rem`,
              }}
            />
          );
        })}
      </ButtonGroup>
      <ButtonGroup focusMode={false}>
        <IconButton
          isDisabled={
            viewedIndex === Math.floor((totalPage - 1) / pagePerIndex)
          }
          icon={LuChevronRight}
          size={size}
          shape={shape}
          onClick={onClickHandler.nextButton}
        />
        <IconButton
          isDisabled={
            viewedIndex === Math.floor((totalPage - 1) / pagePerIndex)
          }
          icon={LuChevronLast}
          size={size}
          shape={shape}
          onClick={onClickHandler.lastButton}
        />
      </ButtonGroup>
    </div>
  );
}
