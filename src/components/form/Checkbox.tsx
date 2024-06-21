import { forwardRef, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";

import type { ContentWithId, ElementBaseSize, ElementStates, InputProps } from "../../types";
import { useInput } from "../../hooks";
import InputMessage from "./InputMessage";

interface CheckboxProps extends ContentWithId, Omit<InputProps, 'id' | 'size' | 'label' | 'helperMessage' | 'checked' | 'defaultChecked'> {
    size?: ElementBaseSize;
    isDependent?: boolean;
    subItems?: React.ComponentProps<typeof Checkbox>[];
};

interface CheckboxGroupProps extends Pick<ElementStates, 'isSelected'>, React.ComponentPropsWithoutRef<'div'> {
    size?: ElementBaseSize;
    isDependent?: boolean;
    subItems?: React.ComponentProps<typeof Checkbox>[];
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ id, size = 'md', heading, description, subItems = [], ...props }, ref) {
    const { isDisabled = false, isSelected = false, isDependent = false, errorMessage, ...restProps } = props;

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
                                    'border-light-tertiary dark:border-dark-tertiary group-hover:border-light-blue dark:group-hover:border-dark-blue'
                    } transition-colors`}>
                    {<FaCheck className={`w-full h-full text-dark ${isChecked ?
                        '' :
                        'scale-0 opacity-0'} transition-all`} />}
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
            {subItems.length > 0 &&
                <CheckboxGroup
                    isDependent={isDependent}
                    isSelected={isChecked}
                    size={size}
                    subItems={subItems} />}
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

const CheckboxGroup = ({ size = 'md', subItems = [], ...props }: CheckboxGroupProps) => {
    const { isDependent = false, isSelected = false, ...restProps } = props;

    return (
        <div {...restProps} className={`w-full flex flex-col gap-2 ${size === 'lg' ?
            'pl-6' :
            size === 'sm' ?
                'pl-4' :
                'pl-5'} py-2 ${restProps.className ?? ''}`}>
            {subItems.map((subItem) =>
                <Checkbox
                    {...subItem}
                    key={subItem.id}
                    isSelected={isDependent ?
                        isSelected :
                        subItem.isSelected}
                    size={size === 'lg' ?
                        'md' :
                        'sm'} />)}
        </div>
    );
}

export default Checkbox;