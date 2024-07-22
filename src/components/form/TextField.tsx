import { forwardRef, useState } from 'react';
import type { IconType } from 'react-icons';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

import type { ElementStatus, InputProps, TextInput } from '../../types';
import { ICON_SIZE } from '../../data/constant';
import { useInput } from '../../hooks';
import InputHeader from './InputHeader';
import InputWrapper from './InputWrapper';
import InputMessage from './InputMessage';
import IconButton from '../ui/IconButton';

interface TextFieldProps
  extends React.PropsWithChildren<
    Pick<ElementStatus, 'isDisabled'> & InputProps<TextInput>
  > {
  fieldIcon?: IconType;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      children,
      type = 'text',
      label,
      fieldIcon,
      helperMessage,
      errorMessage,
      ...props
    },
    ref,
  ) {
    const { isDisabled = false, ...restProps } = props;
    const FieldIcon = fieldIcon ?? null;
    const [isHidden, setIsHidden] = useState<boolean>(type === 'password');
    const {
      hasHeader,
      hasError,
      hasMessage,
      isFocused,
      currentInputLength,
      onFocusInput,
      onBlurInput,
      onChangeInput,
    } = useInput({
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
      <div
        className={`${isDisabled ? 'disabled' : ''} flex w-full flex-col gap-1`}
      >
        {hasHeader && (
          <InputHeader
            label={label}
            id={restProps.id}
            required={restProps.required}
            maxLength={restProps.maxLength}
            currentInputLength={currentInputLength}
          />
        )}
        <InputWrapper isFocused={isFocused} hasError={hasError}>
          {FieldIcon && (
            <>
              <div className="aspect-square h-[2rem] w-max p-2 opacity-bold">
                <FieldIcon size={ICON_SIZE.md} className="h-full w-full" />
              </div>
              <div className="mr-1 h-[1rem] w-1 bg-light-secondary dark:bg-dark-tertiary" />
            </>
          )}
          {children}
          <input
            {...restProps}
            ref={ref}
            type={type !== 'password' ? type : isHidden ? 'password' : 'text'}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
            onChange={onChangeInput}
            className={`w-full bg-inherit px-1 py-2 text-sm outline-none placeholder:opacity-normal ${restProps.className ?? ''}`}
          />
          {type === 'password' && (
            <div className="aspect-square h-[2rem] w-max p-0.5">
              <IconButton
                tabIndex={-1}
                icon={isHidden ? FaEyeSlash : FaEye}
                variant="secondary"
                spacing="compact"
                className={isHidden ? 'opacity-off hover:opacity-100' : ''}
                onClick={() => setIsHidden(prev => !prev)}
              />
            </div>
          )}
        </InputWrapper>
        {hasMessage && (
          <InputMessage
            hasError={hasError}
            helperMessage={helperMessage}
            errorMessage={errorMessage}
          />
        )}
      </div>
    );
  },
);

export default TextField;
