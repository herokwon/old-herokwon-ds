import type {
  Children,
  ContentWithIcon,
  ElementBorderShape,
  ElementExtendedVariant,
  ElementStatus,
  ElementWithHref,
} from '../../types';

import type { ButtonProps } from '../../types/ui';

import LinkableElement from '../LinkableElement';
import LoadableElement from '../LoadableElement';
import Icon from './Icon';

interface TextButtonProps
  extends ElementStatus,
    ElementWithHref,
    ContentWithIcon,
    ButtonProps {
  label: Children;
  variant?: ElementExtendedVariant;
  shape?: ElementBorderShape;
}

export default function TextButton({
  label,
  variant = 'default',
  size = 'md',
  shape = 'square',
  spacing = 'default',
  href,
  iconBefore,
  iconAfter,
  ...props
}: TextButtonProps) {
  const {
    isDisabled = false,
    isSelected = false,
    isLoading = false,
    stopPropagation = false,
    preventDefault = false,
    ...restProps
  } = props;
  const iconBeforeProps = Object.fromEntries(
    Object.entries(iconBefore ?? {}).filter(
      prop => prop[0] !== 'icon' && prop[0] !== 'size',
    ),
  );
  const iconAfterProps = Object.fromEntries(
    Object.entries(iconAfter ?? {}).filter(
      prop => prop[0] !== 'icon' && prop[0] !== 'size',
    ),
  );

  return (
    <LoadableElement isActive={isLoading} variant="spinner">
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
        className={`flex items-center justify-center whitespace-pre outline-none button-${
          spacing === 'none'
            ? `${variant}--no-spacing bg-underline-[1px]`
            : variant
        } ${isLoading || isDisabled ? '' : isSelected ? `selected ${spacing === 'none' ? 'active' : ''}` : ''} ${
          spacing === 'default'
            ? 'px-2.5 py-1'
            : spacing === 'compact'
              ? 'px-1.5 py-0.5'
              : 'p-0'
        } ${
          spacing === 'none'
            ? '!transition-[background-size,_color,_background-color]'
            : `${shape === 'circle' ? 'rounded-full' : 'rounded-ms'} transition-all`
        } ${
          size === 'lg' ? 'text-lg' : size === 'sm' ? 'text-sm' : 'text-base'
        } ${restProps.className ?? ''}`}
      >
        {iconBefore?.icon && (
          <Icon
            {...iconBeforeProps}
            icon={iconBefore.icon}
            size={iconBefore?.size ?? size}
            spacing="none"
            className={`${
              size === 'lg'
                ? spacing === 'default'
                  ? 'mr-2'
                  : 'mr-1.5'
                : spacing === 'default'
                  ? 'mr-1.5'
                  : 'mr-1'
            } ${iconBeforeProps.className ?? ''}`}
          />
        )}
        {label}
        {iconAfter?.icon && (
          <Icon
            {...iconAfterProps}
            icon={iconAfter.icon}
            size={iconAfter?.size ?? size}
            spacing="none"
            className={`${
              size === 'lg'
                ? spacing === 'default'
                  ? 'ml-2'
                  : 'ml-1.5'
                : spacing === 'default'
                  ? 'ml-1.5'
                  : 'ml-1'
            } ${iconAfterProps.className ?? ''}`}
          />
        )}
      </LinkableElement>
    </LoadableElement>
  );
}
