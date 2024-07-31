import type { ElementStatus, InputProps } from '../../types';
import { useInput } from '../../hooks';
import InputHeader from './InputHeader';
import InputMessage from './InputMessage';

type TextareaProps = Pick<ElementStatus, 'isDisabled'> &
  Pick<InputProps, 'label' | 'helperMessage' | 'errorMessage'> &
  React.ComponentPropsWithoutRef<'textarea'>;

export default function Textarea({
  label,
  helperMessage,
  errorMessage,
  ...props
}: TextareaProps) {
  const { isDisabled = false, ...restProps } = props;
  const { hasHeader, hasError, hasMessage, currentInputLength, onChangeInput } =
    useInput<HTMLTextAreaElement>({
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
      <textarea
        {...restProps}
        autoFocus={hasError ? true : restProps?.autoFocus}
        onChange={onChangeInput}
        className={`w-full rounded-ms border border-light-tertiary px-2.5 py-1.5 dark:border-dark-tertiary ${
          hasError
            ? 'caret-light-red focus:border-light-red dark:caret-dark-red dark:focus:border-dark-red'
            : 'caret-light-blue focus:border-light-blue dark:caret-dark-blue dark:focus:border-dark-blue'
        } bg-light-primary text-sm outline-none transition-all dark:bg-dark-secondary ${restProps.className ?? ''}`}
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
