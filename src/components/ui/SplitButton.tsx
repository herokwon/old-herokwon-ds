import { forwardRef, useEffect, useMemo, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

import type { ButtonProps, ElementBaseVariant, ElementSpacing, ElementStates } from "@/types";
import TextButton from "./TextButton";
import IconButton from "./IconButton";

interface SplitButtonItem extends Omit<ElementStates, 'isLoading'> {
    id: string;
    heading: string;
    description?: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};

interface SplitButtonProps extends Omit<ButtonProps, 'spacing' | 'href'> {
    defaultLabel?: string;
    variant?: Exclude<ElementBaseVariant, 'secondary'>;
    spacing?: Exclude<ElementSpacing, 'none'>;
    items: SplitButtonItem[];
};

const SplitButton = forwardRef<HTMLButtonElement, SplitButtonProps>(function SplitButton({ defaultLabel, variant = 'default', size = 'md', spacing = 'default', items, ...props }, ref) {
    const { isDisabled = false, isSelected = false, isLoading = false, ...restProps } = props;

    const [isShowingItems, setIsShowingItems] = useState<boolean>(isSelected);
    const [splitButtonItems, setSplitButtonItems] = useState<SplitButtonItem[]>([...items]);
    const selectedItem = useMemo(() =>
        splitButtonItems.find((item) =>
            item.isSelected) ?? null, [splitButtonItems]);

    useEffect(() => {
        selectedItem &&
            setIsShowingItems(false);
    }, [selectedItem]);

    return (
        <div className="h-full flex relative group">
            <TextButton
                {...restProps}
                ref={ref}
                label={selectedItem?.heading ?? defaultLabel ?? ''}
                variant={variant}
                size={size}
                spacing={spacing}
                isDisabled={isDisabled}
                isSelected={isShowingItems}
                isLoading={isLoading}
                title={selectedItem?.description}
                className='rounded-r-none'
                onClick={isDisabled ?
                    undefined :
                    selectedItem?.onClick} />
            <div className={`w-1 min-h-full ${isDisabled ?
                'disabled' :
                variant === 'primary' ?
                    'bg-blue-600 dark:bg-blue-500' :
                    'bg-tertiary'} transition-all`} />
            <IconButton
                icon={FaChevronDown}
                variant={variant}
                size={size === 'lg' ?
                    'md' :
                    size === 'sm' ?
                        'xs' :
                        'sm'}
                spacing={spacing}
                shape='square'
                isDisabled={isDisabled}
                className={`rounded-l-none ${isShowingItems ?
                    'first:*:rotate-180' :
                    ''} first:*:transition-all`}
                onClick={() => !isDisabled &&
                    setIsShowingItems((prev) => !prev)} />
            <div className={`p-1 my-2 rounded-ms border border-tertiary bg-light-primary dark:bg-dark-secondary ${isShowingItems ?
                '' :
                'pointer-events-none opacity-0 translate-y-[0.25rem]'} transition-all absolute top-full right-0`}>
                <ul className="w-full flex flex-col gap-1">
                    {splitButtonItems.map((item) =>
                        <li
                            key={item.id}
                            className={`px-2 py-1 rounded-ms text-sm ${variant === 'primary' ?
                                (item.isSelected ?
                                    '!text-dark bg-blue' :
                                    'hover:!text-dark hover:bg-blue-500 dark:hover:bg-blue-600') :
                                (item.isSelected ?
                                    'bg-light-secondary dark:bg-dark-tertiary' :
                                    'hover:bg-light-secondary dark:hover:bg-dark-tertiary')} cursor-pointer transition-all`}
                            onClick={() => setSplitButtonItems((prevItems) =>
                                prevItems.map((prevItem) => ({
                                    ...prevItem,
                                    isSelected: prevItem.id === item.id,
                                }))
                            )}>
                            <p className="w-full font-semibold whitespace-pre">
                                {item.heading}
                            </p>
                            {item.description &&
                                <p className="w-full text-xs opacity-normal whitespace-pre">
                                    {item.description}
                                </p>}
                        </li>)}
                </ul>
            </div>
        </div>
    );
});

export default SplitButton;