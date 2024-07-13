import { forwardRef, useMemo } from 'react';
import type { IconType } from 'react-icons';

import type {
  ButtonProps,
  ElementBaseVariant,
  ElementExtendedSize,
} from '../../types';
import { ICON_SIZE } from '../../data/constant';
import LinkableElement from '../LinkableElement';

interface IconButtonProps extends Omit<ButtonProps, 'size'> {
  icon: IconType;
  variant?: ElementBaseVariant;
  size?: ElementExtendedSize;
  shape?: 'square' | 'circle';
  isHoverable?: boolean;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      icon,
      variant = 'default',
      size = 'md',
      spacing = 'default',
      shape = 'circle',
      href,
      ...props
    },
    ref,
  ) {
    const {
      stopPropagation = false,
      preventDefault = false,
      isHoverable = !href,
      isDisabled = false,
      isSelected = false,
      isLoading = false,
      ...restProps
    } = props;

    const Icon = useMemo(() => icon, [icon]);

    return (
      <LinkableElement
        {...restProps}
        as="button"
        ref={ref}
        href={href}
        disabled={isDisabled}
        onClick={e => {
          stopPropagation && e.stopPropagation();
          preventDefault && e.preventDefault();
          restProps.onClick && restProps.onClick(e);
        }}
        className={`button-${variant} ${isSelected ? 'selected' : ''} ${
          !isDisabled && isHoverable ? 'hoverable' : ''
        } ${
          spacing === 'default'
            ? 'p-1'
            : spacing === 'compact'
              ? 'p-0.5'
              : '!bg-transparent p-0'
        } flex items-center justify-center ${
          shape === 'square' ? 'rounded-ms' : 'rounded-full'
        } outline-none transition-all ${restProps.className ?? ''}`}
      >
        <Icon size={ICON_SIZE[size]} className="m-1" />
      </LinkableElement>
    );
  },
);

export default IconButton;
