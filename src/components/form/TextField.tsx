import { forwardRef, useMemo, useState } from "react";
import type { IconType } from "react-icons";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

import type { InputProps, TextInput } from "../../types";
import { ICON_SIZE } from "../../data/constant";
import { useInput } from "../../hooks";
import InputHeader from "./InputHeader";
import InputWrapper from "./InputWrapper";
import InputMessage from "./InputMessage";
import IconButton from "../ui/IconButton";

interface TextFieldProps extends InputProps<TextInput> {
    fieldIcon?: IconType;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField({ type = 'text', label, fieldIcon, ...props }, ref) {
    const { children, isDisabled = false, helperMessage, errorMessage, ...restProps } = props;

    const [isHidden, setIsHidden] = useState<boolean>(type === 'password');
    const FieldIcon = useMemo(() =>
        fieldIcon ?? null, [fieldIcon]);
    const { hasHeader, hasError, hasMessage, isFocused, currentInputLength, onFocusInput, onBlurInput, onChangeInput } = useInput({
        isDisabled: isDisabled,
        label: label,
        helperMessage: helperMessage,
        errorMessage: errorMessage,
        autoFocus: props.autoFocus,
        maxLength: props.maxLength,
        defaultValue: props.defaultValue,
        value: props.value,
        onChange: props.onChange,
    });

    return (
        <div className={`${isDisabled ?
            'disabled' :
            ''} w-full flex flex-col gap-1`}>
            {hasHeader &&
                <InputHeader
                    label={label}
                    id={props.id}
                    required={props.required}
                    maxLength={props.maxLength}
                    currentInputLength={currentInputLength} />}
            <InputWrapper isFocused={isFocused} hasError={hasError}>
                {FieldIcon &&
                    <>
                        <div className="w-max h-[2rem] aspect-square p-2 opacity-bold">
                            <FieldIcon size={ICON_SIZE.md} className="w-full h-full" />
                        </div>
                        <div className="w-1 h-[1rem] mr-1 bg-light-secondary dark:bg-dark-tertiary" />
                    </>}
                <input
                    {...restProps}
                    ref={ref}
                    type={type !== 'password' ?
                        type :
                        isHidden ?
                            'password' :
                            'text'}
                    onFocus={onFocusInput}
                    onBlur={onBlurInput}
                    onChange={onChangeInput}
                    className={`w-full px-1 py-2 text-sm bg-inherit outline-none placeholder:opacity-normal ${restProps.className ?? ''}`} />
                {type === 'password' &&
                    <div className="w-max h-[2rem] aspect-square p-0.5">
                        <IconButton
                            tabIndex={-1}
                            icon={isHidden ?
                                FaEyeSlash :
                                FaEye}
                            variant='secondary'
                            spacing='compact'
                            className={isHidden ?
                                'opacity-off hover:opacity-100' :
                                ''}
                            onClick={() => setIsHidden((prev) => !prev)} />
                    </div>}
                {children}
            </InputWrapper>
            {hasMessage &&
                <InputMessage
                    hasError={hasError}
                    helperMessage={helperMessage}
                    errorMessage={errorMessage} />}
        </div>
    );
});

export default TextField;