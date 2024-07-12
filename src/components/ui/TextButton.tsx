import { forwardRef, useMemo } from 'react';

import type {
  ButtonProps,
  ContentWithIcon,
  ElementExtendedVariant,
} from '../../types';
import { ICON_SIZE } from '../../data/constant';
import LinkableElement from '../LinkableElement';

interface TextButtonProps extends ButtonProps, ContentWithIcon {
  label: string;
  variant?: ElementExtendedVariant;
  isHoverable?: boolean;
}

const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(
  function TextButton(
    {
      label,
      variant = 'default',
      size = 'md',
      spacing = 'default',
      href,
      iconBefore,
      iconAfter,
      ...props
    },
    ref,
  ) {
    const {
      isHoverable = !href,
      stopPropagation = false,
      preventDefault = false,
      isDisabled = false,
      isSelected = false,
      isLoading = false,
      ...restProps
    } = props;

    const BeforeIcon = useMemo(() => iconBefore?.content ?? null, [iconBefore]);
    const AfterIcon = useMemo(() => iconAfter?.content ?? null, [iconAfter]);

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
        className={`button-${
          spacing === 'none' ? `${variant}--no-spacing` : variant
        } ${isSelected ? 'selected' : ''} ${
          isHoverable ? 'hoverable' : href ? 'linkable' : ''
        } ${
          spacing === 'default'
            ? 'px-2.5 py-1'
            : spacing === 'compact'
              ? 'px-1.5 py-0.5'
              : 'p-0'
        } flex items-center justify-center rounded-ms ${
          size === 'lg' ? 'text-lg' : size === 'sm' ? 'text-sm' : 'text-base'
        } outline-none transition-[background-color] ${restProps.className ?? ''}`}
      >
        {BeforeIcon && (
          <BeforeIcon
            {...Object.fromEntries(
              Object.entries(iconBefore ?? {}).filter(
                prop => prop[0] !== 'content',
              ),
            )}
            size={ICON_SIZE[iconBefore?.size ?? size]}
            className={spacing === 'default' ? 'mr-1.5' : 'mr-1'}
          />
        )}
        <p>{label}</p>
        {AfterIcon && (
          <AfterIcon
            {...Object.fromEntries(
              Object.entries(iconAfter ?? {}).filter(
                prop => prop[0] !== 'content',
              ),
            )}
            size={ICON_SIZE[iconAfter?.size ?? size]}
            className={spacing === 'default' ? 'ml-1.5' : 'ml-1'}
          />
        )}
      </LinkableElement>
    );
  },
);

export default TextButton;
