import { useState } from 'react';
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

  return (
    <TextButton
      {...restProps}
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
      }`}
    />
  );
}
