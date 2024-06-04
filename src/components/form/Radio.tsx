import { forwardRef, useEffect, useState } from "react";

import type { ContentWithId, ElementBaseSize, InputProps } from "@/types";
import { useInput } from "@/hooks";
import RadioGroup from "./RadioGroup";

interface RadioProps extends ContentWithId, Omit<InputProps, 'id' | 'size' | 'helperMessage' | 'errorMessage'> {
    size?: ElementBaseSize;
    groupErrorMessage?: InputProps['errorMessage'];
    subGroupItem?: React.ComponentProps<typeof RadioGroup>;
    onChangeItems?: React.ChangeEventHandler<HTMLInputElement>;
};

const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio({ id, size = 'md', heading, description, subGroupItem, onChangeItems, ...props }, ref) {
    const { isDisabled = false, isSelected = false, groupErrorMessage, ...rest } = props;

    const [isChecked, setIsChecked] = useState<boolean>(isSelected);
    const { hasError, onChangeInput } = useInput({
        isDisabled: isDisabled,
        errorMessage: groupErrorMessage,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            onChangeItems && onChangeItems(e);
            setIsChecked(e.currentTarget.checked);
        },
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
                    'h-[1.25rem]' :
                    size === 'sm' ?
                        'h-[0.75rem]' :
                        'h-[1rem]'} aspect-square mr-1.5 my-0.5 flex justify-center items-center rounded-full border-[0.1rem] ${isDisabled ?
                            '' :
                            isChecked ?
                                'border-blue' :
                                hasError ?
                                    'border-red' :
                                    'border-tertiary group-hover:border-blue'} transition-colors relative after:w-4/5 after:h-4/5 after:aspect-square after:rounded-full after:content-[""] after:bg-blue ${isChecked ?
                                        '' :
                                        'after:opacity-0'} after:transition-opacity after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2`}>
                    <input
                        {...rest}
                        hidden
                        readOnly
                        ref={ref}
                        id={id}
                        type='radio'
                        checked={isChecked}
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
            {subGroupItem && subGroupItem.items.length > 0 &&
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