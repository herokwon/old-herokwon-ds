import { useState } from 'react';
import { FaXmark } from 'react-icons/fa6';

import type {
  ElementBaseSize,
  ElementExtendedVariant,
  ElementSpacing,
} from '../../types';

import TextButton from './TextButton';

interface TagProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof TextButton>,
    'isSelected' | 'variant' | 'size' | 'spacing'
  > {
  isRemovable?: boolean;
  variant?: Exclude<ElementExtendedVariant, 'primary'>;
  size?: Exclude<ElementBaseSize, 'lg'>;
  spacing?: Exclude<ElementSpacing, 'default'>;
}

export default function Tag({
  label,
  size = 'sm',
  spacing = 'compact',
  iconBefore,
  iconAfter,
  ...props
}: TagProps) {
  const { isRemovable = false, ...restProps } = props;
  const [isRemoved, setIsRemoved] = useState<boolean>(false);

  return (
    <TextButton
      {...restProps}
      label={label}
      size={size}
      spacing={spacing}
      iconBefore={iconBefore}
      iconAfter={
        !isRemovable
          ? iconAfter
          : {
              icon: FaXmark,
              size: 'xs',
              onClick: e => {
                setIsRemoved(true);
                iconAfter?.onClick?.(e);
              },
            }
      }
      className={`${isRemoved ? 'hidden' : ''} ${
        isRemovable
          ? 'removable cursor-default last:*:cursor-pointer'
          : !restProps.href
            ? 'pointer-events-none cursor-default'
            : ''
      } ${restProps.className ?? ''}`}
    />
  );
}
