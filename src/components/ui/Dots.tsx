import type { ElementExtendedSize } from '../../types';

import { ICON_SIZE } from '../../data/constants';

interface DotsProps extends React.ComponentPropsWithoutRef<'div'> {
  length?: number;
  size?: ElementExtendedSize | number;
}

export default function Dots({ length = 3, size = 'md', ...props }: DotsProps) {
  const dotSize: number = typeof size === 'number' ? size : ICON_SIZE[size];

  return (
    <div
      {...props}
      className={`flex items-center ${props.className ?? ''}`}
      style={{
        gap: `${dotSize / 2}px`,
      }}
    >
      {Array.from({ length: Math.abs(length) }, (_, i) => (
        <svg
          key={i}
          className="aspect-square animate-[opacity-bounce_1s_infinite] fill-light-blue dark:fill-dark-blue"
          style={{
            width: `${dotSize}px`,
            animationDelay: `${i * 200}ms`,
          }}
        >
          <circle cx={dotSize / 2} cy={dotSize / 2} r={dotSize / 2} />
        </svg>
      ))}
    </div>
  );
}
