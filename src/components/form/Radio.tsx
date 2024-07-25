import { forwardRef } from 'react';

import type {
  ContentWithId,
  ElementBaseSize,
  ElementStatus,
  InputProps,
} from '../../types';
import { useRadio, useStatus } from '../../contexts';
import { useInput } from '../../hooks';

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
  const {
    isDisabled = false,
    isChecked,
    defaultChecked = false,
    ...restProps
  } = props;
  const group = useRadio();
  const status = useStatus();
  const disabled = group?.isDisabled || status?.isDisabled || isDisabled;
  const checked =
    group?.selectedId === id ||
    status?.isSelected ||
    isChecked ||
    defaultChecked;
  const { hasError, onChangeInput } = useInput({
    isDisabled: disabled,
    onChange: e => {
      restProps.onChange?.(e.currentTarget.checked);
      group?.onChange(e.currentTarget.id);
    },
  });

  return (
    <label
      htmlFor={id}
      className={`${
        disabled ? 'disabled' : 'group cursor-pointer'
      } flex w-full`}
    >
      <input
        {...restProps}
        type="radio"
        ref={ref}
        id={id}
        hidden
        disabled={disabled}
        checked={checked}
        onChange={onChangeInput}
      />
      <span
        className={`w-max ${
          size === 'lg' ? 'h-xl' : size === 'sm' ? 'h-xs' : 'h-base'
        } my-0.5 mr-1.5 flex aspect-square items-center justify-center rounded-full border-[0.1rem] ${
          checked
            ? 'border-light-blue dark:border-dark-blue'
            : `${
                hasError
                  ? 'border-light-red dark:border-dark-red'
                  : 'group-hover:border-light-blue dark:group-hover:border-dark-blue'
              } border-light-tertiary after:opacity-0 dark:border-dark-tertiary`
        } relative transition-colors after:absolute after:left-1/2 after:top-1/2 after:aspect-square after:h-4/5 after:w-4/5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-light-blue after:transition-opacity after:content-[""] after:dark:bg-dark-blue`}
      />
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
