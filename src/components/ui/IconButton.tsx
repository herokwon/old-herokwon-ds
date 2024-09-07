import type { IconType } from 'react-icons';

import type {
  ElementBaseVariant,
  ElementBorderShape,
  ElementExtendedSize,
  ElementStatus,
  ElementWithHref,
} from '../../types';

import type { ButtonProps } from '../../types/ui';

import LinkableElement from '../LinkableElement';
import LoadableElement from '../LoadableElement';
import Icon from './Icon';

interface IconButtonProps
  extends ElementStatus,
    ElementWithHref,
    Omit<ButtonProps, 'size'> {
  icon: IconType;
  variant?: ElementBaseVariant;
  size?: ElementExtendedSize;
  shape?: ElementBorderShape;
  isHoverable?: boolean;
}

export default function IconButton({
  icon,
  variant = 'default',
  size = 'md',
  spacing = 'default',
  shape = 'circle',
  href,
  ...props
}: IconButtonProps) {
  const {
    stopPropagation = false,
    preventDefault = false,
    isHoverable = !href,
    isDisabled = false,
    isSelected = false,
    isLoading = false,
    ...restProps
  } = props;

  return (
    <LoadableElement
      isActive={isLoading}
      variant="spinner"
      size={size}
      className="only:*:last:*:scale-150"
    >
      <LinkableElement
        {...restProps}
        as="button"
        type={restProps.type || 'button'}
        href={href}
        disabled={isDisabled}
        onClick={e => {
          stopPropagation && e.stopPropagation();
          preventDefault && e.preventDefault();
          restProps.onClick?.(e);
        }}
        className={`button-${variant} ${
          isLoading || isDisabled
            ? ''
            : isSelected
              ? 'selected'
              : isHoverable
                ? 'hoverable'
                : ''
        } ${
          shape === 'square' ? 'rounded-ms' : 'rounded-full'
        } flex items-center justify-center outline-none transition-all ${restProps.className ?? ''}`}
      >
        <Icon icon={icon} size={size} spacing={spacing} />
      </LinkableElement>
    </LoadableElement>
  );
}
