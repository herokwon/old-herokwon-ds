import { useMemo } from "react";

import type { ElementBaseSize, ElementBaseVariant, ElementExtendedSize } from "../../types";

type BadgeFixedVariant = Exclude<ElementBaseVariant, 'secondary'>;
type BadgeChangedVariant = 'added' | 'removed';

type BadgeProps = React.ComponentPropsWithoutRef<'span'> & {
    value: number;
    size?: ElementBaseSize;
    shape?: 'square' | 'round';
} & ({
    maxValue?: number;
    variant: BadgeFixedVariant;
} | {
    variant: BadgeChangedVariant;
});

export default function Badge({ value, size = 'md', shape = 'round', ...props }: BadgeProps) {
    const isFixedVariant = props.variant === 'default' || props.variant === 'primary';
    const maxValue = isFixedVariant ?
        props.maxValue ?? null :
        null;
    const restProps = useMemo(() => ({
        ...Object.fromEntries(Object.entries(props).filter((prop) =>
            prop[0] !== 'variant' && prop[0] !== 'maxValue'))
    }), [props]);

    const renderBadgeValue = (value: number, maxValue: number | null): string => {
        if (!maxValue) return `${props.variant === 'added' ?
            '+' :
            props.variant === 'removed' ?
                '-' :
                ''}${value}`;
        return `${Math.min(value, maxValue)}${value > maxValue ?
            '+' :
            ''}`;
    };

    return (
        <span {...restProps} className={`${props.variant === 'primary' ?
            '!text-dark bg-light-blue dark:bg-dark-blue' :
            props.variant === 'added' ?
                'text-feedback-light-green dark:text-feedback-dark-green bg-feedback-light-green dark:bg-feedback-dark-green' :
                props.variant === 'removed' ?
                    'text-feedback-light-red dark:text-feedback-dark-red bg-feedback-light-red dark:bg-feedback-dark-red' :
                    'bg-light-secondary dark:bg-dark-secondary'} px-1 flex justify-center items-center ${shape === 'square' ?
                        'rounded-ms' :
                        'rounded-full'} ${size === 'lg' ?
                            'text-sm' :
                            size === 'sm' ?
                                'text-[0.625rem] leading-[0.75]' :
                                'text-xs'} font-medium ${props.className ?? ''}`}>
            {renderBadgeValue(value, maxValue)}
        </span>
    );
}