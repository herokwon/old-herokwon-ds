import { useEffect, useMemo, useState } from "react";

import type { ElementStates, InputElement, InputProps } from "@/types";

type InputHookProps =
    Pick<ElementStates, 'isDisabled'> &
    Pick<InputProps, 'label' | 'helperMessage' | 'errorMessage' | 'autoFocus' | 'maxLength' | 'defaultValue' | 'value'> & {
        onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    };
type InputHookReturn = {
    hasHeader: boolean;
    hasError: boolean;
    hasMessage: boolean;
    isFocused: boolean;
    currentInputLength: number;
    onFocusInput: (e: React.FocusEvent<InputElement>) => void;
    onBlurInput: (e: React.FocusEvent<InputElement>) => void;
    onChangeInput: (e: React.ChangeEvent<InputElement>) => void;
};

const useInput = ({ isDisabled, autoFocus = false, label, maxLength, helperMessage, errorMessage, defaultValue, value, onChange }: InputHookProps): InputHookReturn => {
    const [isFocused, setIsFocused] = useState<boolean>(autoFocus);
    const [currentInputLength, setCurrentInputLength] = useState<number>((defaultValue ?? value)?.toString().length ?? 0);

    const hasHeader = useMemo(() =>
        (!(!label) && label.length > 0) || !(!maxLength), [label, maxLength]);
    const hasError = useMemo(() =>
        !(!errorMessage) && errorMessage.length > 0, [errorMessage]);
    const hasMessage = useMemo(() =>
        (!(!helperMessage) && helperMessage.length > 0) || hasError, [helperMessage, hasError]);

    const onFocusInput = () => setIsFocused(true);
    const onBlurInput = () => setIsFocused(false);

    const onChangeInput = (e: React.ChangeEvent<InputElement>) => {
        if (isDisabled) return;

        onChange && onChange(e);
        setCurrentInputLength(e.currentTarget.value.length);
    };

    useEffect(() => {
        if (hasError) onFocusInput();
    }, [hasError]);

    return {
        hasHeader,
        hasError,
        hasMessage,
        isFocused,
        currentInputLength,
        onFocusInput,
        onBlurInput,
        onChangeInput
    };
};

export default useInput;