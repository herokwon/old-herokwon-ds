import { useMemo } from 'react';
import { FaStar } from 'react-icons/fa6';

import type { ElementBaseSize } from '../../types';

import type { InputProps } from '../../types/form';

import { useInput } from '../../hooks';

type InputHeaderProps = Pick<
  InputProps,
  'label' | 'id' | 'maxLength' | 'required'
> &
  Pick<ReturnType<typeof useInput>, 'isFocused' | 'currentInputLength'> & {
    placeholderMode?: boolean;
    hasIcon?: boolean;
    size?: ElementBaseSize;
  };

export default function InputHeader({
  placeholderMode = false,
  hasIcon = false,
  size = 'md',
  label,
  id,
  required,
  maxLength,
  isFocused,
  currentInputLength,
}: InputHeaderProps) {
  const isDownLabel = useMemo(
    () => !isFocused && currentInputLength === 0,
    [isFocused, currentInputLength],
  );

  return (
    <div
      className={`flex w-full ${
        !label && maxLength ? 'justify-end' : 'justify-between'
      } items-center ${
        !placeholderMode ? '' : size === 'lg' ? 'h-xl' : 'h-[1rem]'
      }`}
    >
      {label && (
        <label
          htmlFor={id}
          className={`flex w-fit items-center font-semibold ${
            !placeholderMode
              ? `${
                  size === 'lg' ? 'text-sm' : 'text-xs'
                } ${id ? 'cursor-pointer' : ''}`
              : `${
                  isDownLabel
                    ? `${
                        size === 'lg'
                          ? 'text-lg'
                          : size === 'sm'
                            ? 'text-sm'
                            : 'text-base'
                      } cursor-text font-normal opacity-off`
                    : `pointer-events-none ${
                        size === 'lg' ? 'text-sm' : 'text-xs'
                      }`
                } transition-all delay-75 ease-linear`
          }`}
          style={{
            translate:
              placeholderMode && isDownLabel
                ? `${
                    hasIcon
                      ? `${size === 'lg' ? 2.25 : size === 'sm' ? 1.75 : 2}rem`
                      : 0
                  } calc(${
                    (size === 'lg'
                      ? (0.25 + 0.25 + 1.75 - 0.625 / 2) / 1.75
                      : size === 'sm'
                        ? (0.25 + 0.25 + 1.25 - 0.375 / 2) / 1.25
                        : (0.25 + 0.25 + 1.5 - 0.5 / 2) / 1.5) * 100
                  }%)`
                : undefined,
          }}
        >
          {label}
          {required && <FaStar size={8} className="ml-1" />}
        </label>
      )}
      {maxLength && maxLength > 0 && (
        <span className="input-length-label text-[0.625rem] leading-[0.75rem] opacity-off">
          {`${currentInputLength} / ${maxLength}`}
        </span>
      )}
    </div>
  );
}
