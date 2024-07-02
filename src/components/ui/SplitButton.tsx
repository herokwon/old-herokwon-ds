import { forwardRef, useMemo, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

import type { ButtonProps, DropdownFlatItem, ElementBaseVariant, ElementSpacing, ElementStates, EventHandler } from "../../types";
import TextButton from "./TextButton";
import IconButton from "./IconButton";
import Dropdown from "./Dropdown";

type SplitButtonItem = DropdownFlatItem & EventHandler<'click'>;

interface SplitButtonProps extends Omit<ButtonProps, 'spacing' | 'href'> {
    defaultLabel?: string;
    variant?: Exclude<ElementBaseVariant, 'secondary'>;
    spacing?: Exclude<ElementSpacing, 'none'>;
    items: SplitButtonItem[];
    setItems: React.Dispatch<React.SetStateAction<SplitButtonProps['items']>>;
};

const SplitButton = forwardRef<HTMLButtonElement, SplitButtonProps>(function SplitButton({ defaultLabel, variant = 'default', size = 'md', spacing = 'default', items, setItems, ...props }, ref) {
    const { isDisabled = false, isSelected = false, isLoading = false, ...restProps } = props;

    const [isOpen, setIsOpen] = useState<boolean>(isSelected);
    const selectedItem = useMemo(() =>
        items.find((item) =>
            item.isSelected) ?? null, [items]);

    return (
        <Dropdown
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            triggerItem={
                <div className="h-full flex" onClick={(e) => e.stopPropagation()}>
                    <TextButton
                        {...restProps}
                        ref={ref}
                        label={selectedItem?.heading ?? defaultLabel ?? ''}
                        variant={variant}
                        size={size}
                        spacing={spacing}
                        isDisabled={isDisabled}
                        isSelected={isOpen}
                        isLoading={isLoading}
                        title={selectedItem?.description}
                        className='rounded-r-none'
                        onClick={selectedItem?.onClick} />
                    <div className={`w-1 min-h-full ${isDisabled ?
                        'disabled' :
                        variant === 'primary' ?
                            'bg-dark-blue dark:bg-light-blue' :
                            'bg-light-tertiary dark:bg-dark-secondary'} transition-all`} />
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
                        className={`rounded-l-none ${isOpen ?
                            'first:*:rotate-180' :
                            ''} first:*:transition-all`}
                        onClick={() => !isDisabled &&
                            setIsOpen((prev) => !prev)} />
                </div>
            }>
            <Dropdown.FlatItems
                selectingInput='text'
                items={items}
                setItems={setItems} />
        </Dropdown>
    );
});

export default SplitButton;