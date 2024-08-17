import { forwardRef, useEffect, useMemo, useState } from 'react';

import type { AbsolutePositionY, AlignmentX, ElementStatus } from '../../types';

import type { InputProps } from '../../types/form';

import { useInput } from '../../hooks';

import InputMessage from './InputMessage';

interface RangeProps
  extends Pick<ElementStatus, 'isDisabled'>,
    Omit<InputProps, 'label' | 'value'> {
  isShowingLabel?: boolean;
  labelDirection?: Exclude<AlignmentX, 'center'> | AbsolutePositionY;
  labelPrefix?: string;
  labelSuffix?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChangeValue?: (value: number) => void;
}

const Range = forwardRef<HTMLInputElement, RangeProps>(function Range(
  {
    min = 0,
    max = 100,
    step = 1,
    defaultValue = 0,
    labelDirection = 'left',
    labelPrefix,
    labelSuffix,
    helperMessage,
    errorMessage,
    onChangeValue,
    ...props
  },
  ref,
) {
  const { isDisabled = false, isShowingLabel = false, ...restProps } = props;
  const [selectedValue, setSelectedValue] = useState<number>(defaultValue);
  const percent = useMemo(
    () => (min === max ? 0 : ((selectedValue - min) / (max - min)) * 100),
    [selectedValue, min, max],
  );
  const rangeLabel = useMemo(
    () => `${labelPrefix ?? ''}${selectedValue}${labelSuffix ?? ''}`,
    [labelPrefix, labelSuffix, selectedValue],
  );
  const { hasError, hasMessage, onChangeInput } = useInput({
    isDisabled,
    helperMessage,
    errorMessage,
    onChange: e => {
      const value = Number(e.currentTarget.value);
      !isNaN(value) && setSelectedValue(value);
    },
  });

  useEffect(() => {
    onChangeValue?.(selectedValue);
  }, [selectedValue, onChangeValue]);

  return (
    <div className="w-full">
      <div
        className={`flex w-full ${
          labelDirection.includes('top')
            ? 'flex-col-reverse justify-center'
            : labelDirection.includes('bottom')
              ? 'flex-col justify-center'
              : labelDirection === 'left'
                ? 'flex-row-reverse items-center'
                : 'flex-row items-center'
        } gap-x-3 gap-y-1.5`}
      >
        <label
          htmlFor={restProps.id}
          className={`${isDisabled ? 'disabled' : 'cursor-pointer'} relative flex items-center justify-center group`}
        >
          <div
            className="absolute left-0 top-0 -z-10 h-4 rounded-full bg-light-blue group-hover:bg-dark-blue dark:bg-dark-blue dark:group-hover:bg-light-blue"
            style={{
              width: `${percent}%`,
            }}
          />
          <input
            {...restProps}
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={selectedValue}
            onChange={onChangeInput}
            className={`m-auto w-full border-light-blue bg-transparent group-hover:border-dark-blue slider-thumb:bg-light-blue group-hover:slider-thumb:bg-dark-blue dark:border-dark-blue dark:group-hover:border-light-blue dark:slider-thumb:bg-dark-blue dark:slider-thumb:group-hover:bg-light-blue ${restProps.className ?? ''}`}
          />
        </label>
        {isShowingLabel && (
          <p
            className={`whitespace-nowrap text-sm ${
              labelDirection === 'left' || labelDirection === 'right'
                ? ''
                : labelDirection.includes('left')
                  ? 'text-left'
                  : labelDirection.includes('right')
                    ? 'text-right'
                    : 'text-center'
            }`}
          >
            {rangeLabel}
          </p>
        )}
      </div>
      {hasMessage && (
        <InputMessage
          hasError={hasError}
          helperMessage={helperMessage}
          errorMessage={errorMessage}
          className="mt-2"
        />
      )}
    </div>
  );
});

export default Range;
