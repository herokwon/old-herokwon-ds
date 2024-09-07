import { forwardRef } from 'react';

import type {
  ContentWithId,
  ElementBaseSize,
  ElementStatus,
} from '../../types';

import type { InputProps } from '../../types/form';

import { useInput } from '../../hooks';

import RadioIcon from '../ui/RadioIcon';

interface RadioProps
  extends Pick<ElementStatus, 'isDisabled'>,
    Omit<ContentWithId, 'children'>,
    Required<Pick<InputProps, 'label'>>,
    Omit<
      InputProps,
      | 'id'
      | 'size'
      | 'label'
      | 'helperMessage'
      | 'errorMessage'
      | 'checked'
      | 'defaultChecked'
      | 'onChange'
    > {
  isChecked?: boolean;
  size?: ElementBaseSize;
  onChange?: (checked: boolean) => void;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { id, size = 'md', label, description, ...props },
  ref,
) {
  const { isDisabled = false, isChecked = false, ...restProps } = props;
  const { hasError, onChangeInput } = useInput({
    isDisabled,
    onChange: e => {
      restProps.onChange?.(e.currentTarget.checked);
    },
  });

  return (
    <label
      htmlFor={id}
      className={`${
        isDisabled ? 'disabled' : 'cursor-pointer group'
      } flex w-full`}
    >
      <input
        {...restProps}
        type="radio"
        ref={ref}
        id={id}
        hidden
        disabled={isDisabled}
        checked={isChecked}
        className="peer"
        onChange={onChangeInput}
      />
      <RadioIcon isChecked={isChecked} hasError={hasError} size={size} />
      {!description ? (
        <p
          className={`block w-full ${
            size === 'lg' ? 'text-base' : size === 'sm' ? 'text-xs' : 'text-sm'
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
  );
});

export default Radio;
