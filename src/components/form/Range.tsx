import { forwardRef, useState } from "react";

import type { AbsolutePositionY, AlignmentX, InputProps } from "@/types";
import { useInput } from "@/hooks";
import InputMessage from "./InputMessage";

interface RangeProps extends Omit<InputProps, 'label'> {
    isShowingLabel?: boolean;
    labelDirection?: Exclude<AlignmentX, 'center'> | AbsolutePositionY;
    labelPrefix?: string;
    labelSuffix?: string;
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number;
};

const Range = forwardRef<HTMLInputElement, RangeProps>(function Range({ isShowingLabel = false, labelDirection = 'left', labelPrefix, labelSuffix, helperMessage, errorMessage, ...props }, ref) {
    const { isDisabled = false, min = 0, max = 100, step = 1, ...restProps } = props;
    const rangeDefaultValue = (restProps.defaultValue ?? restProps.value)?.toString();

    const [rangeValue, setRangeValue] = useState<number>(isNaN(Number(rangeDefaultValue)) ?
        0 :
        Number(rangeDefaultValue));
    const { hasError, hasMessage, onChangeInput } = useInput({
        isDisabled: isDisabled,
        helperMessage: helperMessage,
        errorMessage: errorMessage,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = Number(e.currentTarget.value);
            !isNaN(value) && setRangeValue(value);

            const isDarkMode = document.body.className.includes('dark');
            const percent = (value / max) * 100;
            e.currentTarget.style.background = `linear-gradient(to right, ${isDarkMode ?
                '#2563eb' :
                '#3b82f6'} ${percent}%, rgba(255, 255, 255, 0.87) ${percent}%)`;
        },
    });

    return (
        <div className="w-full">
            <label htmlFor={restProps.id} className={`${isDisabled ?
                'disabled' :
                'cursor-pointer'} w-full flex ${labelDirection.includes('top') ?
                    'flex-col-reverse justify-center' :
                    labelDirection.includes('bottom') ?
                        'flex-col justify-center' :
                        labelDirection === 'left' ?
                            'flex-row-reverse items-center' :
                            'flex-row items-center'} gap-x-3 gap-y-1.5`}>
                <input
                    {...restProps}
                    ref={ref}
                    type='range'
                    min={min}
                    max={max}
                    step={step}
                    value={rangeValue}
                    onChange={onChangeInput}
                    className={`w-full ${restProps.className ?? ''}`} />
                {isShowingLabel &&
                    <p className={`text-sm whitespace-nowrap ${(labelDirection === 'left' || labelDirection === 'right') ?
                        '' :
                        labelDirection.includes('left') ?
                            'text-left' :
                            labelDirection.includes('right') ?
                                'text-right' :
                                'text-center'}`}>
                        {`${labelPrefix ?? ''}${rangeValue}${labelSuffix ?? ''}`}
                    </p>}
            </label>
            {hasMessage &&
                <InputMessage
                    hasError={hasError}
                    helperMessage={helperMessage}
                    errorMessage={errorMessage}
                    className='mt-2' />}
        </div>
    );
});

export default Range;