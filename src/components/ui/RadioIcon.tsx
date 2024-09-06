import type { ElementBaseSize } from '../../types';

interface RadioIconProps {
  isChecked: boolean;
  hasError?: boolean;
  size?: ElementBaseSize;
}

export default function RadioIcon({
  isChecked,
  hasError = false,
  size = 'md',
}: RadioIconProps) {
  return (
    <span
      className={`relative my-0.5 mr-1.5 flex aspect-square w-max items-center justify-center rounded-full border-[0.1rem] transition-colors after:absolute after:left-1/2 after:top-1/2 after:aspect-square after:h-4/5 after:w-4/5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-light-blue after:transition-opacity after:content-[""] after:dark:bg-dark-blue ${
        size === 'lg' ? 'h-xl' : size === 'sm' ? 'h-xs' : 'h-base'
      } ${
        isChecked
          ? 'border-light-blue dark:border-dark-blue'
          : `${
              hasError
                ? 'border-light-red dark:border-dark-red'
                : 'group-hover:peer-not-disabled:border-light-blue dark:group-hover:peer-not-disabled:border-dark-blue'
            } border-light-tertiary after:opacity-0 dark:border-dark-tertiary`
      }`}
    />
  );
}
