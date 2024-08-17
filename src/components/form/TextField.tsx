import { forwardRef, useState } from 'react';
import type { IconType } from 'react-icons';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

import type { ElementBaseSize, ElementStatus } from '../../types';

import type { InputProps, TextInput } from '../../types/form';

import { useInput } from '../../hooks';

import Icon from '../ui/Icon';
import IconButton from '../ui/IconButton';
import InputHeader from './InputHeader';
import InputMessage from './InputMessage';
import InputWrapper from './InputWrapper';

interface TextFieldProps
  extends React.PropsWithChildren<
    Pick<ElementStatus, 'isDisabled'> & Omit<InputProps<TextInput>, 'size'>
  > {
  size?: ElementBaseSize;
  fieldIcon?: IconType;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      children,
      size = 'md',
      type = 'text',
      label,
      helperMessage,
      errorMessage,
      fieldIcon,
      ...props
    },
    ref,
  ) {
    const { isDisabled = false, ...restProps } = props;
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
      isDisabled,
      label,
      helperMessage,
      errorMessage,
      ...restProps,
    });
    const [isHidden, setIsHidden] = useState<boolean>(type === 'password');

    return (
      <div
        className={`${isDisabled ? 'disabled' : ''} flex w-full flex-col gap-1`}
      >
        {hasHeader && (
          <InputHeader
            {...restProps}
            placeholderMode
            hasIcon={!!fieldIcon}
            label={label}
            size={size}
            isFocused={isFocused}
            currentInputLength={currentInputLength}
          />
        )}
        <InputWrapper
          size={size}
          isFocused={isFocused}
          hasError={hasError}
          onFocusInput={onFocusInput}
        >
          {fieldIcon && (
            <Icon
              icon={fieldIcon}
              size={size}
              className={`transition-opacity ${currentInputLength > 0 ? 'opacity-off' : ''}`}
            />
          )}
          <input
            {...restProps}
            ref={ref}
            type={type !== 'password' ? type : isHidden ? 'password' : 'text'}
            disabled={isDisabled}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
            onChange={onChangeInput}
            className={`w-full outline-none placeholder:opacity-normal ${restProps.className ?? ''}`}
          />
          {type === 'password' ? (
            <IconButton
              icon={isHidden ? FaEyeSlash : FaEye}
              variant="secondary"
              spacing="compact"
              className={isHidden ? 'not-hover:opacity-off' : ''}
              onClick={() => setIsHidden(prev => !prev)}
            />
          ) : (
            children
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
