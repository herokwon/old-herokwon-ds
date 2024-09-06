import { FaCheck } from 'react-icons/fa6';

import type { ElementBaseSize } from '../../types';

interface CheckboxIconProps {
  isChecked: boolean;
  hasError?: boolean;
  size?: ElementBaseSize;
}

export default function CheckboxIcon({
  isChecked,
  hasError = false,
  size = 'md',
}: CheckboxIconProps) {
  return (
    <span
      className={`w-max ${
        size === 'lg' ? 'h-xl' : size === 'sm' ? 'h-xs' : 'h-base'
      } my-0.5 mr-1.5 flex aspect-square items-center justify-center ${
        size === 'sm' ? 'rounded-[0.1875rem]' : 'rounded-ms'
      } border-[0.1rem] ${
        hasError ? 'border-light-red dark:border-dark-red' : ''
      } ${
        isChecked
          ? 'border-light-blue bg-light-blue dark:border-dark-blue dark:bg-dark-blue'
          : `${
              hasError
                ? 'border-light-red dark:border-dark-red'
                : 'border-light-tertiary group-hover:peer-not-disabled:border-light-blue dark:border-dark-tertiary dark:group-hover:peer-not-disabled:border-dark-blue'
            } bg-light-tertiary transition-colors dark:bg-dark-secondary`
      }`}
    >
      <FaCheck
        className={`h-full w-full ${
          isChecked
            ? 'text-dark'
            : 'text-dark dark:text-dark/normal dark:group-hover:text-dark'
        } transition-all`}
      />
    </span>
  );
}
