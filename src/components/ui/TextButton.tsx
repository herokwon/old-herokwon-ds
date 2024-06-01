import { useMemo } from "react";
import { useRouter } from "next/navigation";
import type { IconType } from "react-icons";

import type { ButtonProps, ElementExtendedVariant } from "@/types";
import { ICON_SIZE } from "@/data/constant";

interface TextButtonIcon {
    content: IconType;
    size?: TextButtonProps['size'];
};

interface TextButtonProps extends ButtonProps {
    label: string;
    variant?: ElementExtendedVariant;
    iconBefore?: TextButtonIcon;
    iconAfter?: TextButtonIcon;
};

export default function TextButton({ label, variant = 'default', size = 'md', spacing = 'default', href, iconBefore, iconAfter, ...props }: TextButtonProps) {
    const { isDisabled = false, isSelected = false, isLoading = false, ...rest } = props;

    const { push, replace } = useRouter();
    const BeforeIcon = useMemo(() =>
        iconBefore?.content ?? null, [iconBefore]);
    const AfterIcon = useMemo(() =>
        iconAfter?.content ?? null, [iconAfter]);

    const onClickTextButton = (e: React.MouseEvent<HTMLButtonElement>) => {
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
            onClick={onClickTextButton}
            className={`button-${spacing === 'none' ?
                `${variant}--no-spacing` :
                variant} ${isSelected ?
                    'selected' :
                    ''} ${spacing === 'default' ?
                        'px-2.5 py-1' :
                        spacing === 'compact' ?
                            'px-1.5 py-0.5' :
                            'p-0'} flex justify-center items-center rounded-ms ${size === 'lg' ?
                                'text-lg' :
                                size === 'sm' ?
                                    'text-sm' :
                                    'text-base'} outline-none ${spacing === 'none' ?
                                        '' :
                                        'transition-all'} ${rest.className ?? ''}`}>
            {BeforeIcon &&
                <BeforeIcon size={ICON_SIZE[iconBefore?.size ?? size]} className='mr-1.5' />}
            {label}
            {AfterIcon &&
                <AfterIcon size={ICON_SIZE[iconAfter?.size ?? size]} className='ml-1.5' />}
        </button>
    );
}