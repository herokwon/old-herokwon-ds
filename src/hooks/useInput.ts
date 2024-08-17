import { useEffect, useMemo, useState } from 'react';

import type { ElementStatus } from '../types';

import type { InputElement, InputProps } from '../types/form';

type InputHookProps<T extends InputElement> = Pick<
  ElementStatus,
  'isDisabled'
> &
  Pick<
    InputProps,
    | 'label'
    | 'helperMessage'
    | 'errorMessage'
    | 'autoFocus'
    | 'maxLength'
    | 'defaultValue'
    | 'value'
  > & {
    onChange?: React.ChangeEventHandler<T>;
  };
type InputHookReturn<T extends InputElement> = {
  hasHeader: boolean;
  hasError: boolean;
  hasMessage: boolean;
  isFocused: boolean;
  currentInputLength: number;
  onFocusInput: () => void;
  onBlurInput: () => void;
  onChangeInput: (e: React.ChangeEvent<T>) => void;
};

const useInput = <T extends InputElement = HTMLInputElement>({
  isDisabled,
  label,
  helperMessage,
  errorMessage,
  autoFocus,
  maxLength,
  defaultValue,
  value,
  onChange,
}: InputHookProps<T>): InputHookReturn<T> => {
  const [isFocused, setIsFocused] = useState<boolean>(autoFocus || false);
  const [currentInputLength, setCurrentInputLength] = useState<number>(
    maxLength && maxLength > 0
      ? ((defaultValue ?? value)?.toString().length ?? 0)
      : 0,
  );

  const hasHeader = useMemo(() => !!label || !!maxLength, [label, maxLength]);
  const hasError = useMemo(
    () => !!errorMessage && errorMessage.length > 0,
    [errorMessage],
  );
  const hasMessage = useMemo(
    () => (!!helperMessage && helperMessage.length > 0) || hasError,
    [helperMessage, hasError],
  );

  const onFocusInput = () => setIsFocused(true);
  const onBlurInput = () => setIsFocused(false);
  const onChangeInput = (e: React.ChangeEvent<T>) => {
    if (isDisabled) return;
    onChange?.(e);
    setCurrentInputLength(e.currentTarget.value.length);
  };

  useEffect(() => {
    setIsFocused(autoFocus || false);
  }, [autoFocus]);

  useEffect(() => {
    hasError && onFocusInput();
  }, [hasError]);

  return {
    hasHeader,
    hasError,
    hasMessage,
    isFocused,
    currentInputLength,
    onFocusInput,
    onBlurInput,
    onChangeInput,
  };
};

export default useInput;
