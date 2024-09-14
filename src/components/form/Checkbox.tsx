import { forwardRef, useState } from 'react';

import type {
  ContentWithId,
  ElementBaseSize,
  ElementStatus,
} from '../../types';

import type { InputProps } from '../../types/form';

import { useInput } from '../../hooks';

import CheckboxIcon from '../ui/CheckboxIcon';
import InputMessage from './InputMessage';

interface CheckboxProps
  extends Pick<ElementStatus, 'isDisabled'>,
    Omit<ContentWithId, 'content'>,
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
  const uncontrolled = isChecked === undefined;
  const [checked, setChecked] = useState<boolean>(defaultChecked);
  const { hasError, hasMessage, onChangeInput } = useInput({
    isDisabled,
    errorMessage,
    onChange: e => {
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
          isDisabled ? 'disabled' : 'cursor-pointer group'
        } flex w-full`}
      >
        <input
          {...restProps}
          type="checkbox"
          ref={ref}
          id={id}
          hidden
          disabled={isDisabled}
          checked={uncontrolled ? checked : isChecked}
          className="peer"
          onChange={onChangeInput}
        />
        <CheckboxIcon
          isChecked={isChecked || checked}
          hasError={hasError}
          size={size}
        />
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
