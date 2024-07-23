import { forwardRef } from 'react';
import type { IconType } from 'react-icons';

import type { DatetimeInput, ElementStatus, InputProps } from '../../types';
import { ICON_SIZE } from '../../data/constant';
import { useInput } from '../../hooks';
import InputHeader from './InputHeader';
import InputWrapper from './InputWrapper';
import InputMessage from './InputMessage';

interface DatetimeFieldProps
  extends Pick<ElementStatus, 'isDisabled'>,
    InputProps {
  type?: DatetimeInput;
  fieldIcon?: IconType;
}

const DatetimeField = forwardRef<HTMLInputElement, DatetimeFieldProps>(
  function DatetimeField(
    { type = 'date', label, helperMessage, errorMessage, fieldIcon, ...props },
    ref,
  ) {
    const { isDisabled = false, ...restProps } = props;
    const FieldIcon = fieldIcon ?? null;
    const inputEventHandlerProps = Object.fromEntries(
      Object.entries(restProps).filter(prop => prop[0].includes('on')),
    );
    const inputNotEventHandlerProps = Object.fromEntries(
      Object.entries(restProps).filter(
        prop => !(prop[0] in inputEventHandlerProps),
      ),
    );
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
        <InputWrapper
          {...inputEventHandlerProps}
          isFocused={isFocused}
          hasError={hasError}
          onFocusInput={onFocusInput}
        >
          <input
            {...inputNotEventHandlerProps}
            ref={ref}
            type={type}
            disabled={isDisabled}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
            onChange={onChangeInput}
            className={`w-full bg-inherit px-1 py-2 text-sm outline-none placeholder:opacity-normal ${restProps.className ?? ''}`}
          />
          {FieldIcon && (
            <>
              <div className="h-[1rem] w-1 bg-light-secondary dark:bg-dark-tertiary" />
              <div
                className={`aspect-square h-[2rem] w-max p-2 ${
                  isFocused ? 'opacity-bold' : 'opacity-normal'
                }`}
              >
                <FieldIcon size={ICON_SIZE.md} className="h-full w-full" />
              </div>
            </>
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
