import type { InputProps } from '../../types';
import { useInput } from '../../hooks';
import InputHeader from './InputHeader';
import InputMessage from './InputMessage';

type TextareaProps = Pick<
  InputProps,
  'isDisabled' | 'label' | 'helperMessage' | 'errorMessage'
> &
  React.ComponentPropsWithoutRef<'textarea'>;

export default function Textarea({
  isDisabled = false,
  label,
  helperMessage,
  errorMessage,
  ...props
}: TextareaProps) {
  const { hasHeader, hasError, hasMessage, currentInputLength, onChangeInput } =
    useInput({
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
    <div
      className={`${isDisabled ? 'disabled' : ''} flex w-full flex-col gap-1`}
    >
      {hasHeader && (
        <InputHeader
          label={label}
          id={props.id}
          required={props.required}
          maxLength={props.maxLength}
          currentInputLength={currentInputLength}
        />
      )}
      <textarea
        {...props}
        autoFocus={hasError ? true : props?.autoFocus}
        onChange={onChangeInput}
        className={`w-full rounded-ms border border-light-tertiary px-2.5 py-1.5 dark:border-dark-tertiary ${
          hasError
            ? 'focus:border-light-red dark:focus:border-dark-red'
            : 'focus:border-light-blue dark:focus:border-dark-blue'
        } bg-light-primary text-sm outline-none transition-all dark:bg-dark-secondary ${props.className ?? ''}`}
      />
      {hasMessage && (
        <InputMessage
          hasError={hasError}
          helperMessage={helperMessage}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
}
