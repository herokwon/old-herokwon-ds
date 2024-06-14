import { useMemo } from "react";

import type { ElementBaseSize, ElementBaseVariant, ElementExtendedSize } from "@/types";

type BadgeFixedVariant = Exclude<ElementBaseVariant, 'secondary'>;
type BadgeChangedVariant = 'added' | 'removed';
type BadgeSize = Extract<ElementExtendedSize, 'xs'> | Exclude<ElementBaseSize, 'lg'>;

type BadgeProps = React.ComponentPropsWithoutRef<'span'> & {
    value: number;
    size?: BadgeSize;
    shape?: 'square' | 'round';
} & ({
    maxValue?: number;
    variant: BadgeFixedVariant;
} | {
    variant: BadgeChangedVariant;
});

export default function Badge({ value, size = 'sm', shape = 'round', ...props }: BadgeProps) {
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
        <span {...restProps} className={`badge-${props.variant} px-1 flex justify-center items-center ${shape === 'square' ?
            'rounded-ms' :
            'rounded-full'} ${size === 'md' ?
                'text-base' :
                size === 'xs' ?
                    'text-xs' :
                    'text-sm'} font-medium ${props.className ?? ''}`}>
            {renderBadgeValue(value, maxValue)}
        </span>
    );
}