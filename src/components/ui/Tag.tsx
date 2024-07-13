import { useEffect, useRef, useState } from 'react';
import { LuHash, LuX } from 'react-icons/lu';

import type {
  ContentWithIcon,
  ElementBaseSize,
  ElementSpacing,
} from '../../types';
import TextButton from './TextButton';

interface TagProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof TextButton>,
    'isHoverable' | 'size' | 'spacing' | 'iconAfter'
  > {
  isRemovable?: boolean;
  size?: Exclude<ElementBaseSize, 'lg'>;
  spacing?: Exclude<ElementSpacing, 'default'>;
  iconAfter?: Partial<ContentWithIcon['iconAfter']>;
}

export default function Tag({ isRemovable = false, ...props }: TagProps) {
  const {
    size = 'sm',
    spacing = 'compact',
    iconBefore = { content: LuHash },
    iconAfter,
    ...restProps
  } = props;

  const [isRemoved, setIsRemoved] = useState<boolean>(false);
  const tagRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isRemovable || !tagRef.current || !tagRef.current.lastElementChild)
      return;
    const removeButton = tagRef.current.lastElementChild as HTMLElement;

    removeButton.onmouseenter = () =>
      tagRef.current?.classList.add('removable');
    removeButton.onmouseleave = () =>
      tagRef.current?.classList.remove('removable');
  }, [isRemovable]);

  return (
    <TextButton
      {...restProps}
      ref={tagRef}
      isHoverable={false}
      size={size}
      spacing={spacing}
      iconBefore={iconBefore}
      iconAfter={
        !isRemovable
          ? iconAfter
          : {
              content: iconAfter?.content ?? LuX,
              onClick: e => {
                setIsRemoved(true);
                iconAfter?.onClick && iconAfter.onClick(e);
              },
              onMouseEnter: () =>
                isRemovable && tagRef.current?.classList.add('removable'),
              onMouseLeave: () =>
                isRemovable && tagRef.current?.classList.remove('removable'),
            }
      }
      tabIndex={!restProps.href ? -1 : undefined}
      className={`${isRemoved ? 'hidden' : ''} ${
        isRemovable
          ? '!cursor-default last:*:cursor-pointer'
          : !restProps.href
            ? '!cursor-default'
            : ''
      }`}
    />
  );
}
