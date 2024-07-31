import type {
  ButtonProps,
  ContentWithIcon,
  ElementBorderShape,
  ElementExtendedVariant,
  ElementStatus,
  ElementWithHref,
} from '../../types';
import { ICON_SIZE } from '../../data/constant';
import LoadableElement from '../LoadableElement';
import LinkableElement from '../LinkableElement';

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
    <LoadableElement isActive={isLoading}>
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
          spacing === 'none' ? `${variant}--no-spacing` : variant
        } ${isSelected ? 'selected' : ''} ${
          spacing === 'default'
            ? 'px-2.5 py-1'
            : spacing === 'compact'
              ? 'px-1.5 py-0.5'
              : 'p-0'
        } flex items-center justify-center ${
          shape === 'circle' ? 'rounded-full' : 'rounded-ms'
        } ${
          size === 'lg' ? 'text-lg' : size === 'sm' ? 'text-sm' : 'text-base'
        } outline-none transition-colors ${restProps.className ?? ''}`}
      >
        {BeforeIcon && (
          <BeforeIcon
            {...iconBeforeProps}
            size={ICON_SIZE[iconBefore?.size ?? size]}
            className={spacing === 'default' ? 'mr-1.5' : 'mr-1'}
          />
        )}
        {label}
        {AfterIcon && (
          <AfterIcon
            {...iconAfterProps}
            size={ICON_SIZE[iconAfter?.size ?? size]}
            className={spacing === 'default' ? 'ml-1.5' : 'ml-1'}
          />
        )}
      </LinkableElement>
    </LoadableElement>
  );
}
