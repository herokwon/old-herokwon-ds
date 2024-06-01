import { useMemo } from "react";
import { useRouter } from "next/navigation";
import type { IconType } from "react-icons";

import type { ButtonProps, ElementBaseVariant, ElementExtendedSize } from "@/types";
import { ICON_SIZE } from "@/data/constant";

interface IconButtonProps extends Omit<ButtonProps, 'size'> {
    icon: IconType;
    variant?: ElementBaseVariant;
    size?: ElementExtendedSize;
    shape?: 'square' | 'circle';
};

export default function IconButton({ icon, variant = 'default', size = 'md', spacing = 'default', shape = 'circle', href, ...props }: IconButtonProps) {
    const { isDisabled = false, isSelected = false, isLoading = false, ...rest } = props;

    const { push, replace } = useRouter();
    const Icon = useMemo(() =>
        icon, [icon]);

    const onClickIconButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isDisabled) return;
        rest.onClick && rest.onClick(e);

        if (!href) return;
        href.replace ?
            replace(href.to) :
            push(href.to);
    };

    return (
        <button
            {...rest}
            disabled={isDisabled}
            onClick={onClickIconButton}
            className={`button-${variant} ${isSelected ?
                'selected' :
                ''} ${spacing === 'default' ?
                    'p-1' :
                    spacing === 'compact' ?
                        'p-0.5' :
                        'p-0 !bg-transparent'} flex justify-center items-center ${shape === 'square' ?
                            'rounded-ms' :
                            'rounded-full'} outline-none transition-all ${rest.className ?? ''}`}>
            <Icon size={ICON_SIZE[size]} className='m-1' />
        </button>
    );
}