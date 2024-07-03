import { forwardRef, useMemo } from "react";
import type { IconType } from "react-icons";

import type { ButtonProps, ElementBaseVariant, ElementExtendedSize } from "../../types";
import { ICON_SIZE } from "../../data/constant";
import LinkWrapper from "../LinkWrapper";

interface IconButtonProps extends Omit<ButtonProps, 'size'> {
    icon: IconType;
    variant?: ElementBaseVariant;
    size?: ElementExtendedSize;
    shape?: 'square' | 'circle';
    isHoverable?: boolean;
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton({ icon, variant = 'default', size = 'md', spacing = 'default', shape = 'circle', href, ...props }, ref) {
    const { isHoverable = !href, isDisabled = false, isSelected = false, isLoading = false, ...restProps } = props;

    const Icon = useMemo(() =>
        icon, [icon]);

    return (
        <LinkWrapper
            isDisabled={isDisabled}
            href={href?.to}
            replace={href?.replace}>
            <button
                {...restProps}
                ref={ref}
                disabled={isDisabled}
                onClick={(e) => {
                    if (!(!href)) e.preventDefault();
                    restProps.onClick && restProps.onClick(e);
                }}
                className={`button-${variant} ${isSelected ?
                    'selected' :
                    ''} ${!isDisabled && isHoverable ?
                        'hoverable' :
                        ''} ${spacing === 'default' ?
                            'p-1' :
                            spacing === 'compact' ?
                                'p-0.5' :
                                'p-0 !bg-transparent'} flex justify-center items-center ${shape === 'square' ?
                                    'rounded-ms' :
                                    'rounded-full'} outline-none transition-all ${restProps.className ?? ''}`}>
                <Icon size={ICON_SIZE[size]} className='m-1' />
            </button>
        </LinkWrapper>
    );
});

export default IconButton;