import { forwardRef, useMemo } from "react";
import type { IconType } from "react-icons";

import type { DatetimeInput, InputProps } from "@/types";
import { ICON_SIZE } from "@/data/constant";
import { useInput } from "@/hooks";
import InputHeader from "./InputHeader";
import InputWrapper from "./InputWrapper";
import InputMessage from "./InputMessage";

interface DatetimeFieldProps extends InputProps {
    type?: DatetimeInput;
    fieldIcon?: IconType;
};

const DatetimeField = forwardRef<HTMLInputElement, DatetimeFieldProps>(function DatetimeField({ type = 'date', label, helperMessage, errorMessage, fieldIcon, ...props }, ref) {
    const { isDisabled = false, ...restProps } = props;

    const FieldIcon = useMemo(() =>
        fieldIcon ?? null, [fieldIcon]);
    const { hasHeader, hasError, hasMessage, isFocused, currentInputLength, onFocusInput, onBlurInput, onChangeInput } = useInput({
        isDisabled: isDisabled,
        label: label,
        helperMessage: helperMessage,
        errorMessage: errorMessage,
        autoFocus: restProps.autoFocus,
        maxLength: restProps.maxLength,
        defaultValue: restProps.defaultValue,
        value: restProps.value,
        onChange: restProps.onChange,
    });

    return (
        <div className={`${isDisabled ?
            'disabled' :
            ''} w-full flex flex-col gap-1`}>
            {hasHeader &&
                <InputHeader
                    label={label}
                    id={restProps.id}
                    required={restProps.required}
                    maxLength={restProps.maxLength}
                    currentInputLength={currentInputLength} />}
            <InputWrapper isFocused={isFocused} hasError={hasError}>
                <input
                    {...restProps}
                    ref={ref}
                    type={type}
                    onFocus={onFocusInput}
                    onBlur={onBlurInput}
                    onChange={onChangeInput}
                    className={`w-full px-1 py-2 text-sm bg-inherit outline-none placeholder:opacity-normal ${restProps.className ?? ''}`} />
                {FieldIcon &&
                    <>
                        <div className="w-1 h-[1rem] mr-1 bg-light-secondary dark:bg-dark-tertiary" />
                        <div className={`w-max h-[2rem] aspect-square p-2 ${isFocused ?
                            'opacity-100' :
                            'opacity-normal'}`}>
                            <FieldIcon size={ICON_SIZE.md} className="w-full h-full" />
                        </div>
                    </>}
            </InputWrapper>
            {hasMessage &&
                <InputMessage
                    hasError={hasError}
                    helperMessage={helperMessage}
                    errorMessage={errorMessage} />}
        </div>
    );
});

export default DatetimeField;