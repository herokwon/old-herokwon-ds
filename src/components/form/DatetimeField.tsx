import { forwardRef } from 'react';
import type { IconType } from 'react-icons';

import type { ElementBaseSize, ElementStatus } from '../../types';

import type { DatetimeInput, InputProps } from '../../types/form';

import { useInput } from '../../hooks';

import Icon from '../ui/Icon';
import InputHeader from './InputHeader';
import InputMessage from './InputMessage';
import InputWrapper from './InputWrapper';

interface DatetimeFieldProps
  extends Pick<ElementStatus, 'isDisabled'>,
    Omit<InputProps<DatetimeInput>, 'size'> {
  size?: ElementBaseSize;
  fieldIcon?: IconType;
}

const DatetimeField = forwardRef<HTMLInputElement, DatetimeFieldProps>(
  function DatetimeField(
    {
      size = 'md',
      type = 'date',
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

    const inputEventHandlerProps = Object.fromEntries(
      Object.entries(restProps).filter(prop => prop[0].includes('on')),
    );
    const inputNotEventHandlerProps = Object.fromEntries(
      Object.entries(restProps).filter(
        prop => !(prop[0] in inputEventHandlerProps),
      ),
    );

    return (
      <div
        className={`${isDisabled ? 'disabled' : ''} flex w-full flex-col gap-1`}
      >
        {hasHeader && (
          <InputHeader
            {...restProps}
            label={label}
            size={size}
            hasIcon={!!fieldIcon}
            isFocused={isFocused}
            currentInputLength={currentInputLength}
          />
        )}
        <InputWrapper
          {...inputEventHandlerProps}
          size={size}
          isFocused={isFocused}
          hasError={hasError}
          onFocusInput={onFocusInput}
          className="*:cursor-pointer"
        >
          <input
            {...inputNotEventHandlerProps}
            ref={ref}
            type={type}
            disabled={isDisabled}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
            onChange={onChangeInput}
            className={`w-full outline-none placeholder:opacity-normal ${restProps.className ?? ''}`}
          />
          {fieldIcon && (
            <Icon
              icon={fieldIcon}
              size={size}
              className={`transition-opacity ${isFocused ? 'opacity-off' : ''}`}
            />
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

export default DatetimeField;
