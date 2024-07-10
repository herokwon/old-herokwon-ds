import { useMemo } from "react";
import type { IconType } from "react-icons";

import type { ButtonProps, ElementExtendedSize } from "../../types";

interface ToggleProps extends Omit<ButtonProps, 'isSelected' | 'isLoading' | 'size' | 'spacing' | 'href'> {
    size?: ElementExtendedSize;
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    activeIcon?: IconType;
    inactiveIcon?: IconType;
};

const TOGGLE_SIZES: { [size in ElementExtendedSize]: number } = {
    xl: 3.5,
    lg: 3,
    md: 2.5,
    sm: 2,
    xs: 1.5,
};

export default function Toggle({ size = 'md', isActive, setIsActive, activeIcon, inactiveIcon, ...props }: ToggleProps) {
    const { isDisabled = false, ...restProps } = props;
    const InactiveIcon = useMemo(() =>
        inactiveIcon ?? null, [inactiveIcon]);
    const ActiveIcon = useMemo(() =>
        activeIcon ?? null, [activeIcon]);

    return (
        <button
            {...restProps}
            disabled={isDisabled}
            onClick={() => !isDisabled &&
                setIsActive((prev) => !prev)}
            className={`aspect-[2/1] flex items-center rounded-full text-xs ${isActive ?
                'bg-light-blue hover:bg-dark-blue dark:bg-dark-blue dark:hover:bg-light-blue' :
                'bg-light-secondary dark:bg-dark-secondary'} transition-all relative ${restProps.className ?? ''}`}
            style={{
                width: `${TOGGLE_SIZES[size]}rem`,
                padding: `${(TOGGLE_SIZES[size] / 2) * 0.125}rem`,
            }}>
            <span className="w-full h-3/5 flex items-center whitespace-nowrap transition-all absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{
                paddingLeft: `${(TOGGLE_SIZES[size] / 2) * 0.125}rem`,
                paddingRight: `${(TOGGLE_SIZES[size] / 2) * 0.125}rem`,
            }}>
                {isActive &&
                    ActiveIcon &&
                    <span className="h-full mr-auto flex justify-center" style={{
                        width: `${(TOGGLE_SIZES[size] / 2)}rem`
                    }}>
                        <ActiveIcon className='w-fit h-full aspect-square text-dark' />
                    </span>}
                {!isActive &&
                    InactiveIcon &&
                    <span className="h-full ml-auto flex justify-center" style={{
                        width: `${(TOGGLE_SIZES[size] / 2)}rem`
                    }}>
                        <InactiveIcon className="w-fit h-full aspect-square" />
                    </span>}
            </span>
            <span className={`w-fit h-full aspect-square rounded-full bg-white will-change-transform transition-all relative top-1/2 left-0 ${isActive ?
                'translate-x-[calc((100%/3)*4)]' :
                ''} -translate-y-1/2 z-10`} />
        </button>
    );
}