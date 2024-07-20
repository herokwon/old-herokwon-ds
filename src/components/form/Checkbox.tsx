import { forwardRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';

import type {
  ContentWithId,
  ElementBaseSize,
  ElementStatus,
  InputProps,
} from '../../types';
import { useStatus } from '../../contexts';
import { useInput } from '../../hooks';
import InputMessage from './InputMessage';

interface CheckboxProps
  extends Pick<ElementStatus, 'isDisabled'>,
    Omit<ContentWithId, 'children'>,
    Required<Pick<InputProps, 'label'>>,
    Omit<
      InputProps,
      'id' | 'size' | 'label' | 'helperMessage' | 'checked' | 'onChange'
    > {
  isChecked?: boolean;
  size?: ElementBaseSize;
  onChange?: (checked: boolean) => void;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { id, size = 'md', label, description, errorMessage, onChange, ...props },
  ref,
) {
  const {
    isDisabled = false,
    isChecked,
    defaultChecked = false,
    ...restProps
  } = props;

  const status = useStatus();
  const uncontrolled =
    status?.isSelected === undefined && isChecked === undefined;
  const disabled = status?.isDisabled || isDisabled;
  const [checked, setChecked] = useState<boolean>(defaultChecked);
  const { hasError, hasMessage, onChangeInput } = useInput({
    isDisabled: disabled,
    errorMessage: errorMessage,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      uncontrolled
        ? setChecked(e.currentTarget.checked)
        : onChange?.(e.currentTarget.checked);
    },
  });

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={`${
          disabled ? 'disabled' : 'group cursor-pointer'
        } flex w-full`}
      >
        <input
          {...restProps}
          type="checkbox"
          ref={ref}
          id={id}
          hidden
          disabled={disabled}
          checked={uncontrolled ? checked : status?.isSelected || isChecked}
          onChange={onChangeInput}
        />
        <span
          className={`w-max ${
            size === 'lg' ? 'h-xl' : size === 'sm' ? 'h-xs' : 'h-base'
          } my-0.5 mr-1.5 flex aspect-square items-center justify-center ${
            size === 'sm' ? 'rounded-[0.1875rem]' : 'rounded-ms'
          } border-[0.1rem] ${
            hasError ? 'border-light-red dark:border-dark-red' : ''
          } ${
            status?.isSelected || isChecked || checked
              ? 'border-light-blue bg-light-blue dark:border-dark-blue dark:bg-dark-blue'
              : `${
                  hasError
                    ? 'border-light-red dark:border-dark-red'
                    : 'border-light-tertiary group-hover:border-light-blue dark:border-dark-tertiary dark:group-hover:border-dark-blue'
                } bg-light-tertiary transition-colors dark:bg-dark-secondary`
          }`}
        >
          <FaCheck
            className={`h-full w-full ${
              status?.isSelected || isChecked || checked
                ? 'text-dark'
                : 'text-dark dark:text-dark/normal dark:group-hover:text-dark'
            } transition-all`}
          />
        </span>
        {!description ? (
          <p
            className={`block w-full ${
              size === 'lg'
                ? 'text-base'
                : size === 'sm'
                  ? 'text-xs'
                  : 'text-sm'
            } whitespace-pre`}
          >
            {label}
          </p>
        ) : (
          <div className="w-full">
            <p
              className={`block w-full ${
                size === 'lg'
                  ? 'text-base'
                  : size === 'sm'
                    ? 'text-xs'
                    : 'text-sm'
              } whitespace-pre`}
            >
              {label}
            </p>
            <p
              className={`${
                size === 'lg'
                  ? 'text-sm'
                  : size === 'sm'
                    ? 'text-[0.625rem] leading-[0.75rem]'
                    : 'text-xs'
              } whitespace-pre opacity-off`}
            >
              {description}
            </p>
          </div>
        )}
      </label>
      {hasMessage && (
        <InputMessage
          hasError={hasError}
          errorMessage={errorMessage}
          className={`mt-2 ${size === 'lg' ? 'text-sm' : ''}`}
        />
      )}
    </div>
  );
});

export default Checkbox;
