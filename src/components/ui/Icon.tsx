import type { IconType } from 'react-icons';

import type { ElementExtendedSize, ElementSpacing } from '../../types';

import { ICON_SIZE } from '../../data/constant';

interface IconProps extends React.ComponentPropsWithoutRef<'div'> {
  icon: IconType;
  size?: ElementExtendedSize;
  spacing?: ElementSpacing;
}

export default function Icon({
  icon,
  size = 'md',
  spacing = 'default',
  ...props
}: IconProps) {
  const Icon = icon;

  return (
    <div
      {...props}
      className={`flex aspect-square items-center justify-center ${
        spacing === 'default'
          ? 'p-1'
          : spacing === 'compact'
            ? 'p-0.5'
            : '!bg-transparent p-0'
      } ${props.className ?? ''}`}
    >
      <Icon
        size={ICON_SIZE[size]}
        className={spacing === 'none' ? '' : 'm-1'}
      />
    </div>
  );
}
