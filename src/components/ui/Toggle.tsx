import { useEffect, useState } from 'react';
import type { IconType } from 'react-icons';

import type { ElementExtendedSize, ElementStatus } from '../../types';

import type { ButtonProps } from '../../types/ui';

import Icon from './Icon';

interface ToggleProps
  extends Pick<ElementStatus, 'isDisabled'>,
    Omit<ButtonProps, 'size' | 'spacing' | 'onChange'> {
  size?: ElementExtendedSize;
  defaultActive?: boolean;
  activeIcon?: IconType;
  inactiveIcon?: IconType;
  onChange?: (state: boolean) => void;
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
  activeIcon,
  inactiveIcon,
  onChange,
  ...props
}: ToggleProps) {
  const {
    isDisabled = false,
    defaultActive = false,
    stopPropagation = false,
    preventDefault = false,
    ...restProps
  } = props;
  const [isActive, setIsActive] = useState<boolean>(defaultActive);

  useEffect(() => {
    setIsActive(defaultActive);
  }, [defaultActive]);

  useEffect(() => {
    onChange?.(isActive);
  }, [isActive, onChange]);

  return (
    <button
      {...restProps}
      disabled={isDisabled}
      onClick={e => {
        stopPropagation && e.stopPropagation();
        preventDefault && e.preventDefault();
        !isDisabled && setIsActive(prev => !prev);
        restProps.onClick?.(e);
      }}
      className={`flex aspect-[2/1] items-center rounded-full text-xs ${
        isActive
          ? 'bg-light-blue hover:bg-dark-blue dark:bg-dark-blue dark:hover:bg-light-blue'
          : 'bg-light-secondary hover:bg-light-tertiary dark:bg-dark-secondary dark:hover:bg-dark-tertiary'
      } relative transition-all ${restProps.className ?? ''}`}
      style={{
        width: `${TOGGLE_SIZES[size]}rem`,
        padding: `${(TOGGLE_SIZES[size] / 2) * 0.125}rem`,
      }}
    >
      <span
        className={`relative left-0 top-1/2 aspect-square h-full w-fit rounded-full bg-white transition-all will-change-transform ${
          isActive ? 'translate-x-[calc((100%/3)*4)]' : ''
        } z-10 -translate-y-1/2`}
      />
      <div
        className="absolute left-1/2 top-1/2 flex h-3/4 w-full -translate-x-1/2 -translate-y-1/2 items-center whitespace-nowrap transition-all"
        style={{
          paddingLeft: `${(TOGGLE_SIZES[size] / 2) * 0.125}rem`,
          paddingRight: `${(TOGGLE_SIZES[size] / 2) * 0.125}rem`,
        }}
      >
        {isActive && activeIcon && (
          <Icon
            icon={activeIcon}
            spacing="none"
            className="mr-auto h-full text-dark"
            style={{
              width: `${TOGGLE_SIZES[size] / 2}rem`,
            }}
          />
        )}
        {!isActive && inactiveIcon && (
          <Icon
            icon={inactiveIcon}
            spacing="none"
            className="ml-auto h-full"
            style={{ width: `${TOGGLE_SIZES[size] / 2}rem` }}
          />
        )}
      </div>
    </button>
  );
}
