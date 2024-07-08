import { forwardRef, useEffect, useMemo, useState } from "react";
import { FaCheck } from "react-icons/fa6";

import type { ContentWithId, ElementBaseSize, InputProps } from "../../types";
import { useInput } from "../../hooks";
import InputMessage from "./InputMessage";

interface CheckboxProps extends ContentWithId, Omit<InputProps, 'id' | 'size' | 'label' | 'helperMessage' | 'checked' | 'defaultChecked'> {
    size?: ElementBaseSize;
    subItems?: CheckboxProps[];
};

type CheckboxGroupProps =
    Pick<React.ComponentProps<typeof Checkbox>, 'size' | 'subItems'> &
    React.ComponentPropsWithoutRef<'div'> & {
        isGroupChecked: boolean;
        setIsGroupChecked: React.Dispatch<React.SetStateAction<boolean>>;
    };

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ children, id, size = 'md', heading, description, subItems = [], ...props }, ref) {
    const { isDisabled = false, isSelected = false, errorMessage, ...restProps } = props;

    const [isChecked, setIsChecked] = useState<boolean>(isSelected);
    const { hasError, hasMessage, onChangeInput } = useInput({
        isDisabled: isDisabled,
        errorMessage: errorMessage,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            restProps.onChange && restProps.onChange(e);
            setIsChecked(e.currentTarget.checked);
        }
    });

    useEffect(() => {
        setIsChecked(isSelected);
    }, [isSelected]);

    return (
        <div className="w-full">
            <label htmlFor={id} className={`${isDisabled ?
                'disabled' :
                'cursor-pointer group'} w-full flex`}>
                <span className={`w-max ${size === 'lg' ?
                    'h-xl' :
                    size === 'sm' ?
                        'h-xs' :
                        'h-base'} aspect-square mr-1.5 my-0.5 flex justify-center items-center ${size === 'sm' ?
                            'rounded-[0.1875rem]' :
                            'rounded-ms'} border-[0.1rem] ${isChecked ?
                                'border-light-blue dark:border-dark-blue bg-light-blue dark:bg-dark-blue' :
                                errorMessage ?
                                    'border-light-red dark:border-dark-red' :
                                    'border-light-tertiary dark:border-dark-tertiary group-hover:border-light-blue dark:group-hover:border-dark-blue bg-light-tertiary dark:bg-dark-secondary'
                    } transition-colors`}>
                    {<FaCheck className={`w-full h-full ${isChecked ?
                        'text-dark' :
                        'text-dark dark:text-dark/normal dark:group-hover:text-dark'} transition-all`} />}
                    <input
                        {...restProps}
                        ref={ref}
                        id={id}
                        hidden
                        type='checkbox'
                        defaultChecked={isSelected}
                        onChange={onChangeInput} />
                </span>
                <div className="w-full">
                    <p className={`${size === 'lg' ?
                        'text-base' :
                        size === 'sm' ?
                            'text-xs' :
                            'text-sm'} font-semibold whitespace-pre`}>
                        {heading}
                    </p>
                    {description &&
                        <p className={`${size === 'lg' ?
                            'text-sm' :
                            size === 'sm' ?
                                'text-[0.625rem] leading-[0.75rem]' :
                                'text-xs'} whitespace-pre opacity-normal`}>
                            {description}
                        </p>}
                </div>
            </label>
            {children}
            {subItems.length > 0 &&
                <CheckboxGroup
                    size={size}
                    subItems={subItems}
                    isGroupChecked={isChecked}
                    setIsGroupChecked={setIsChecked} />}
            {hasMessage &&
                <InputMessage
                    hasError={hasError}
                    errorMessage={errorMessage}
                    className={`mt-2 ${size === 'lg' ?
                        'text-sm' :
                        ''}`} />}
        </div>
    );
});

const CheckboxGroup = ({ size = 'md', subItems = [], isGroupChecked, setIsGroupChecked, ...props }: CheckboxGroupProps) => {
    const [checkboxGroupItems, setCheckboxGroupItems] = useState<{ id: string; isChecked: boolean; }[]>([...subItems.map((subItem) => ({
        id: subItem.id,
        isChecked: subItem.isSelected ?? false,
    }))]);
    const allChecked = useMemo(() =>
        checkboxGroupItems.reduce((acc, item) =>
            acc && item.isChecked, true), [checkboxGroupItems]);
    const allNotChecked = useMemo(() =>
        checkboxGroupItems.reduce((acc, item) =>
            acc && !item.isChecked, true), [checkboxGroupItems]);

    useEffect(() => {
        setIsGroupChecked(allChecked);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allChecked]);

    useEffect(() => {
        setCheckboxGroupItems((groupItems) =>
            groupItems.map((groupItem) => ({
                ...groupItem,
                isChecked: isGroupChecked ?
                    true :
                    (allChecked || allNotChecked) ?
                        false :
                        groupItem.isChecked,
            })));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGroupChecked]);

    return (
        <div {...props} className={`w-full flex flex-col gap-2 ${size === 'lg' ?
            'pl-6' :
            size === 'sm' ?
                'pl-4' :
                'pl-5'} py-2 ${props.className ?? ''}`}>
            {subItems.map((subItem) =>
                <Checkbox
                    {...subItem}
                    key={subItem.id}
                    isSelected={checkboxGroupItems.find((groupItem) => groupItem.id === subItem.id)?.isChecked}
                    size={size === 'lg' ?
                        'md' :
                        'sm'}
                    onChange={(e) => setCheckboxGroupItems((groupItems) =>
                        groupItems.map((groupItem) => ({
                            ...groupItem,
                            isChecked: (subItem.id === groupItem.id) ?
                                e.currentTarget?.checked ?? false :
                                groupItem.isChecked,
                            // [▲] It cannot sometimes read properties of 'e.currentTarget (=== null) → Add null checking'
                        })))
                    } />)}
        </div>
    );
}

export default Checkbox;