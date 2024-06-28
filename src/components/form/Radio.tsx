import { forwardRef, useEffect, useState } from "react";

import type { ContentWithId, ElementBaseSize, InputProps } from "../../types";
import { useInput } from "../../hooks";
import RadioGroup from "./RadioGroup";

interface RadioProps extends ContentWithId, Omit<InputProps, 'id' | 'size' | 'label' | 'helperMessage' | 'errorMessage' | 'checked' | 'defaultChecked'> {
    size?: ElementBaseSize;
    groupErrorMessage?: InputProps['errorMessage'];
    subGroupItem?: React.ComponentProps<typeof RadioGroup>;
};

const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio({ id, size = 'md', heading, description, subGroupItem, ...props }, ref) {
    const { isDisabled = false, isSelected = false, groupErrorMessage, ...restProps } = props;

    const [isChecked, setIsChecked] = useState<boolean>(isSelected);
    const { hasError, onChangeInput } = useInput({
        isDisabled: isDisabled,
        errorMessage: groupErrorMessage,
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
                        'h-base'} aspect-square mr-1.5 my-0.5 flex justify-center items-center rounded-full border-[0.1rem] ${isDisabled ?
                            '' :
                            isChecked ?
                                'border-light-blue dark:border-dark-blue' :
                                hasError ?
                                    'border-light-red dark:border-dark-red' :
                                    'border-light-tertiary dark:border-dark-tertiary group-hover:border-light-blue dark:group-hover:border-dark-blue'} transition-colors relative after:w-4/5 after:h-4/5 after:aspect-square after:rounded-full after:content-[""] after:bg-light-blue after:dark:bg-dark-blue ${isChecked ?
                                        '' :
                                        'after:opacity-0'} after:transition-opacity after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2`}>
                    <input
                        {...restProps}
                        ref={ref}
                        id={id}
                        hidden
                        type='radio'
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
            {subGroupItem &&
                subGroupItem.items.length > 0 &&
                <RadioGroup
                    {...subGroupItem}
                    isDisabled={!isChecked}
                    size={size === 'lg' ?
                        'md' :
                        'sm'}
                    items={subGroupItem.items}
                    className={`${size === 'lg' ?
                        'pl-6' :
                        size === 'sm' ?
                            'pl-4' :
                            'pl-5'} py-2`} />}
        </div>

    );
});

export default Radio;