import type {
  ContentWithIcon,
  ElementBorderShape,
  ElementExtendedVariant,
  ElementStatus,
  ElementWithHref,
} from '../../types';

import type { ButtonProps } from '../../types/ui';

import { ICON_SIZE } from '../../data/constant';

import LinkableElement from '../LinkableElement';
import LoadableElement from '../LoadableElement';

interface TextButtonProps
  extends ElementStatus,
    ElementWithHref,
    ContentWithIcon,
    ButtonProps {
  label: React.ReactNode;
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
  const BeforeIcon = iconBefore?.content ?? null;
  const AfterIcon = iconAfter?.content ?? null;
  const iconBeforeProps = Object.fromEntries(
    Object.entries(iconBefore ?? {}).filter(
      prop => prop[0] !== 'content' && prop[0] !== 'size',
    ),
  );
  const iconAfterProps = Object.fromEntries(
    Object.entries(iconAfter ?? {}).filter(
      prop => prop[0] !== 'content' && prop[0] !== 'size',
    ),
  );

  return (
    <LoadableElement isActive={isLoading} size="sm">
      <LinkableElement
        {...restProps}
        as="button"
        href={href}
        disabled={isDisabled}
        onClick={e => {
          stopPropagation && e.stopPropagation();
          preventDefault && e.preventDefault();
          restProps.onClick?.(e);
        }}
        className={`button-${
          spacing === 'none'
            ? `${variant}--no-spacing bg-underline-[1px]`
            : variant
        } ${isSelected ? 'selected' : ''} ${
          spacing === 'default'
            ? 'px-2.5 py-1'
            : spacing === 'compact'
              ? 'px-1.5 py-0.5'
              : isSelected
                ? 'p-0 active'
                : 'p-0'
        } flex items-center justify-center ${
          spacing === 'none'
            ? ''
            : shape === 'circle'
              ? 'rounded-full'
              : 'rounded-ms'
        } ${
          size === 'lg' ? 'text-lg' : size === 'sm' ? 'text-sm' : 'text-base'
        } outline-none !transition-[background-size,_color,_background-color] ${restProps.className ?? ''}`}
      >
        {BeforeIcon && (
          <BeforeIcon
            {...iconBeforeProps}
            size={ICON_SIZE[iconBefore?.size ?? size]}
            className={`${
              size === 'lg'
                ? `${spacing === 'default' ? 'mr-2' : 'mr-1.5'}`
                : size === 'sm'
                  ? `${spacing === 'default' ? 'mr-1' : 'mr-0.5'}`
                  : `${spacing === 'default' ? 'mr-1.5' : 'mr-1'}`
            } ${iconBeforeProps.className ?? ''}`}
          />
        )}
        {label}
        {AfterIcon && (
          <AfterIcon
            {...iconAfterProps}
            size={ICON_SIZE[iconAfter?.size ?? size]}
            className={`${
              size === 'lg'
                ? `${spacing === 'default' ? 'mr-2' : 'mr-1.5'}`
                : size === 'sm'
                  ? `${spacing === 'default' ? 'mr-1' : 'mr-0.5'}`
                  : `${spacing === 'default' ? 'mr-1.5' : 'mr-1'}`
            } ${iconAfterProps.className ?? ''}`}
          />
        )}
      </LinkableElement>
    </LoadableElement>
  );
}
