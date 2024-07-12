import { forwardRef, useEffect, useState } from 'react';

import type { ContentWithId, ElementBaseSize, InputProps } from '../../types';
import { useInput } from '../../hooks';
import RadioGroup from './RadioGroup';

interface RadioProps
  extends ContentWithId,
    Omit<
      InputProps,
      | 'id'
      | 'size'
      | 'label'
      | 'helperMessage'
      | 'errorMessage'
      | 'checked'
      | 'defaultChecked'
    > {
  size?: ElementBaseSize;
  groupErrorMessage?: InputProps['errorMessage'];
  subGroupItem?: React.ComponentProps<typeof RadioGroup>;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { children, id, size = 'md', heading, description, subGroupItem, ...props },
  ref,
) {
  const {
    isDisabled = false,
    isSelected = false,
    groupErrorMessage,
    ...restProps
  } = props;

  const [isChecked, setIsChecked] = useState<boolean>(isSelected);
  const { hasError, onChangeInput } = useInput({
    isDisabled: isDisabled,
    errorMessage: groupErrorMessage,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      restProps.onChange && restProps.onChange(e);
      setIsChecked(e.currentTarget.checked);
    },
  });

  useEffect(() => {
    setIsChecked(isSelected);
  }, [isSelected]);

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={`${
          isDisabled ? 'disabled' : 'group cursor-pointer'
        } flex w-full`}
      >
        <span
          className={`w-max ${
            size === 'lg' ? 'h-xl' : size === 'sm' ? 'h-xs' : 'h-base'
          } my-0.5 mr-1.5 flex aspect-square items-center justify-center rounded-full border-[0.1rem] ${
            isDisabled
              ? ''
              : isChecked
                ? 'border-light-blue dark:border-dark-blue'
                : hasError
                  ? 'border-light-red dark:border-dark-red'
                  : 'border-light-tertiary group-hover:border-light-blue dark:border-dark-tertiary dark:group-hover:border-dark-blue'
          } relative transition-colors after:aspect-square after:h-4/5 after:w-4/5 after:rounded-full after:bg-light-blue after:content-[""] after:dark:bg-dark-blue ${
            isChecked ? '' : 'after:opacity-0'
          } after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:transition-opacity`}
        >
          <input
            {...restProps}
            ref={ref}
            id={id}
            hidden
            type="radio"
            checked={isChecked}
            onChange={onChangeInput}
          />
        </span>
        <div className="w-full">
          <p
            className={`${
              size === 'lg'
                ? 'text-base'
                : size === 'sm'
                  ? 'text-xs'
                  : 'text-sm'
            } whitespace-pre font-semibold`}
          >
            {heading}
          </p>
          {description && (
            <p
              className={`${
                size === 'lg'
                  ? 'text-sm'
                  : size === 'sm'
                    ? 'text-[0.625rem] leading-[0.75rem]'
                    : 'text-xs'
              } whitespace-pre opacity-normal`}
            >
              {description}
            </p>
          )}
        </div>
      </label>
      {children}
      {subGroupItem && subGroupItem.items.length > 0 && (
        <RadioGroup
          {...subGroupItem}
          isDisabled={!isChecked}
          size={size === 'lg' ? 'md' : 'sm'}
          items={subGroupItem.items}
          className={`${
            size === 'lg' ? 'pl-6' : size === 'sm' ? 'pl-4' : 'pl-5'
          } py-2`}
        />
      )}
    </div>
  );
});

export default Radio;
