import { useMemo } from 'react';
import type { IconType } from 'react-icons';

import type {
  ButtonProps,
  ElementExtendedSize,
  ElementStatus,
} from '../../types';

interface ToggleProps
  extends Pick<ElementStatus, 'isDisabled'>,
    Omit<ButtonProps, 'size' | 'spacing'> {
  size?: ElementExtendedSize;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  activeIcon?: IconType;
  inactiveIcon?: IconType;
}

const TOGGLE_SIZES: { [size in ElementExtendedSize]: number } = {
  xl: 3.5,
  lg: 3,
  md: 2.5,
  sm: 2,
  xs: 1.5,
};

export default function Toggle({
  size = 'md',
  isActive,
  setIsActive,
  activeIcon,
  inactiveIcon,
  ...props
}: ToggleProps) {
  const {
    stopPropagation = false,
    preventDefault = false,
    isDisabled = false,
    ...restProps
  } = props;

  const InactiveIcon = useMemo(() => inactiveIcon ?? null, [inactiveIcon]);
  const ActiveIcon = useMemo(() => activeIcon ?? null, [activeIcon]);

  return (
    <button
      {...restProps}
      disabled={isDisabled}
      onClick={e => {
        stopPropagation && e.stopPropagation();
        preventDefault && e.preventDefault();
        !isDisabled && setIsActive(prev => !prev);
        restProps.onClick && restProps.onClick(e);
      }}
      className={`flex aspect-[2/1] items-center rounded-full text-xs ${
        isActive
          ? 'bg-light-blue hover:bg-dark-blue dark:bg-dark-blue dark:hover:bg-light-blue'
          : 'bg-light-secondary dark:bg-dark-secondary'
      } relative transition-all ${restProps.className ?? ''}`}
      style={{
        width: `${TOGGLE_SIZES[size]}rem`,
        padding: `${(TOGGLE_SIZES[size] / 2) * 0.125}rem`,
      }}
    >
      <span
        className="absolute left-1/2 top-1/2 flex h-3/5 w-full -translate-x-1/2 -translate-y-1/2 items-center whitespace-nowrap transition-all"
        style={{
          paddingLeft: `${(TOGGLE_SIZES[size] / 2) * 0.125}rem`,
          paddingRight: `${(TOGGLE_SIZES[size] / 2) * 0.125}rem`,
        }}
      >
        {isActive && ActiveIcon && (
          <span
            className="mr-auto flex h-full justify-center"
            style={{
              width: `${TOGGLE_SIZES[size] / 2}rem`,
            }}
          >
            <ActiveIcon className="aspect-square h-full w-fit text-dark" />
          </span>
        )}
        {!isActive && InactiveIcon && (
          <span
            className="ml-auto flex h-full justify-center"
            style={{
              width: `${TOGGLE_SIZES[size] / 2}rem`,
            }}
          >
            <InactiveIcon className="aspect-square h-full w-fit" />
          </span>
        )}
      </span>
      <span
        className={`relative left-0 top-1/2 aspect-square h-full w-fit rounded-full bg-white transition-all will-change-transform ${
          isActive ? 'translate-x-[calc((100%/3)*4)]' : ''
        } z-10 -translate-y-1/2`}
      />
    </button>
  );
}
