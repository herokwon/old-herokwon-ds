import type { IconType } from 'react-icons';

import type { ElementExtendedSize, ElementSpacing } from '../../types';

import { ICON_SIZE } from '../../data/constants';

interface IconProps extends React.ComponentPropsWithoutRef<'div'> {
  icon: IconType;
  size?: ElementExtendedSize | number;
  spacing?: ElementSpacing;
}

export default function Icon({
  icon,
  size = 'md',
  spacing = 'default',
  ...props
}: IconProps) {
  const IconElement = icon;

  return (
    <div
      {...props}
      className={`flex aspect-square size-fit items-center justify-center ${
        spacing === 'default'
          ? 'p-1'
          : spacing === 'compact'
            ? 'p-0.5'
            : '!bg-transparent p-0'
      } ${props.className ?? ''}`}
    >
      <IconElement
        size={typeof size === 'number' ? size : ICON_SIZE[size]}
        className={
          spacing === 'default' ? 'm-1' : spacing === 'compact' ? 'm-0.5' : ''
        }
      />
    </div>
  );
}
