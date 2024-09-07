import type { ElementExtendedSize } from '../../types';

import { ICON_SIZE } from '../../data/constants';

interface DotsProps extends React.ComponentPropsWithoutRef<'div'> {
  length?: number;
  size?: ElementExtendedSize | number;
}

export default function Dots({ length = 3, size = 'md', ...props }: DotsProps) {
  return (
    <div
      {...props}
      className={`flex items-center ${
        typeof size === 'number'
          ? ''
          : size === 'xl'
            ? 'gap-x-2.5'
            : size === 'lg'
              ? 'gap-x-[0.5625rem]'
              : size === 'xs'
                ? 'gap-x-1.5'
                : size === 'sm'
                  ? 'gap-x-[0.4375rem]'
                  : 'gap-x-2'
      } ${props.className ?? ''}`}
      style={{
        columnGap: typeof size === 'number' ? `${size / 2}px` : undefined,
      }}
    >
      {Array.from({ length: Math.abs(length) }, (_, i) => (
        <svg
          key={i}
          className="aspect-square animate-[opacity-bounce_1s_infinite] fill-light-blue dark:fill-dark-blue"
          style={{
            width: typeof size === 'number' ? `${size}px` : ICON_SIZE[size],
            animationDelay: `${i * 200}ms`,
          }}
        >
          <circle cx="50%" cy="50%" r="50%" />
        </svg>
      ))}
    </div>
  );
}
