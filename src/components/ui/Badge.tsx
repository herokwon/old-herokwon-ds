import type { ElementBaseSize, ElementBaseVariant } from '../../types';

type BadgeFixedVariant = Exclude<ElementBaseVariant, 'secondary'>;
type BadgeChangedVariant = 'added' | 'removed';

type BadgeProps = React.ComponentPropsWithoutRef<'span'> & {
  value: number;
  size?: ElementBaseSize;
  shape?: 'square' | 'round';
} & (
    | {
        maxValue?: number;
        variant: BadgeFixedVariant;
      }
    | {
        variant: BadgeChangedVariant;
      }
  );

export default function Badge({
  value,
  size = 'md',
  shape = 'round',
  ...props
}: BadgeProps) {
  const isFixedVariant =
    props.variant === 'default' || props.variant === 'primary';
  const maxValue = isFixedVariant ? props.maxValue ?? null : null;
  const restProps = Object.fromEntries(
    Object.entries(props).filter(
      prop => prop[0] !== 'variant' && prop[0] !== 'maxValue',
    ),
  );

  const renderBadgeValue = (value: number, maxValue: number | null): string => {
    if (!maxValue)
      return `${
        props.variant === 'added' ? '+' : props.variant === 'removed' ? '-' : ''
      }${value}`;
    return `${Math.min(value, maxValue)}${value > maxValue ? '+' : ''}`;
  };

  return (
    <span
      {...restProps}
      className={`${
        props.variant === 'primary'
          ? 'bg-light-blue !text-dark dark:bg-dark-blue'
          : props.variant === 'added'
            ? 'bg-feedback-light-green text-feedback-light-green dark:bg-feedback-dark-green dark:text-feedback-dark-green'
            : props.variant === 'removed'
              ? 'bg-feedback-light-red text-feedback-light-red dark:bg-feedback-dark-red dark:text-feedback-dark-red'
              : 'bg-light-secondary dark:bg-dark-secondary'
      } flex items-center justify-center px-1 ${
        shape === 'square' ? 'rounded-ms' : 'rounded-full'
      } ${
        size === 'lg'
          ? 'text-sm'
          : size === 'sm'
            ? 'text-[0.625rem] leading-[0.75]'
            : 'text-xs'
      } font-medium ${restProps.className ?? ''}`}
    >
      {renderBadgeValue(value, maxValue)}
    </span>
  );
}
