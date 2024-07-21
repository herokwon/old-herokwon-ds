import { forwardRef, useMemo } from 'react';

import type {
  AbsolutePositionY,
  AlignmentX,
  ElementStatus,
  InputProps,
} from '../../types';
import { useInput } from '../../hooks';
import InputMessage from './InputMessage';

interface RangeProps
  extends Pick<ElementStatus, 'isDisabled'>,
    Omit<InputProps, 'label' | 'value' | 'defaultValue'> {
  isShowingLabel?: boolean;
  labelDirection?: Exclude<AlignmentX, 'center'> | AbsolutePositionY;
  labelPrefix?: string;
  labelSuffix?: string;
  min?: number;
  max?: number;
  step?: number;
  selectedValue: number;
  setSelectedValue: React.Dispatch<React.SetStateAction<number>>;
}

const Range = forwardRef<HTMLInputElement, RangeProps>(function Range(
  {
    labelDirection = 'left',
    labelPrefix,
    labelSuffix,
    helperMessage,
    errorMessage,
    selectedValue,
    setSelectedValue,
    ...props
  },
  ref,
) {
  const {
    isShowingLabel = false,
    isDisabled = false,
    min = 0,
    max = 100,
    step = 1,
    ...restProps
  } = props;
  const percent = useMemo(
    () => (min === max ? 0 : ((selectedValue - min) / (max - min)) * 100),
    [selectedValue, min, max],
  );
  const rangeLabel = useMemo(
    () => `${labelPrefix ?? ''}${selectedValue}${labelSuffix ?? ''}`,
    [labelPrefix, labelSuffix, selectedValue],
  );
  const { hasError, hasMessage, onChangeInput } = useInput({
    isDisabled: isDisabled,
    helperMessage: helperMessage,
    errorMessage: errorMessage,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.currentTarget.value);
      !isNaN(value) && setSelectedValue(value);
    },
  });

  return (
    <div className="w-full">
      <label
        htmlFor={restProps.id}
        className={`${isDisabled ? 'disabled' : 'cursor-pointer'} group relative flex w-full ${
          labelDirection.includes('top')
            ? 'flex-col-reverse justify-center'
            : labelDirection.includes('bottom')
              ? 'flex-col justify-center'
              : labelDirection === 'left'
                ? 'flex-row-reverse items-center'
                : 'flex-row items-center'
        } gap-x-3 gap-y-1.5`}
      >
        <div
          className="absolute left-0 top-1/2 -z-10 h-full -translate-y-1/2 rounded-full bg-light-blue group-hover:bg-dark-blue dark:bg-dark-blue dark:group-hover:bg-light-blue"
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
          className={`w-full border-light-blue bg-transparent group-hover:border-dark-blue slider-thumb:bg-light-blue group-hover:slider-thumb:bg-dark-blue dark:border-dark-blue dark:group-hover:border-light-blue dark:slider-thumb:bg-dark-blue dark:slider-thumb:group-hover:bg-light-blue ${restProps.className ?? ''}`}
        />
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
      </label>
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
