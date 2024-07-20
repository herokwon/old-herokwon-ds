import { useState } from 'react';
import { LuHash, LuX } from 'react-icons/lu';

import type { ElementBaseSize, ElementSpacing } from '../../types';
import TextButton from './TextButton';

interface TagProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof TextButton>,
    'isHoverable' | 'label' | 'size' | 'spacing'
  > {
  children: React.ComponentPropsWithoutRef<typeof TextButton>['label'];
  isRemovable?: boolean;
  size?: Exclude<ElementBaseSize, 'lg'>;
  spacing?: Exclude<ElementSpacing, 'default'>;
}

export default function Tag({ isRemovable = false, ...props }: TagProps) {
  const {
    children,
    size = 'sm',
    spacing = 'compact',
    iconBefore = { content: LuHash },
    iconAfter,
    ...restProps
  } = props;

  const [isRemoved, setIsRemoved] = useState<boolean>(false);

  return (
    <TextButton
      {...restProps}
      isHoverable={false}
      label={children}
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
              onMouseEnter: e =>
                isRemovable &&
                e.currentTarget.parentElement?.classList.add('removable'),
              onMouseLeave: e =>
                isRemovable &&
                e.currentTarget.parentElement?.classList.remove('removable'),
            }
      }
      tabIndex={!restProps.href ? -1 : undefined}
      className={`${isRemoved ? 'hidden' : ''} ${
        isRemovable
          ? '!cursor-default last:*:cursor-pointer'
          : !restProps.href
            ? '!cursor-default'
            : ''
      } ${restProps.className ?? ''}`}
    />
  );
}
