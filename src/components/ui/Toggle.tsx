import { useEffect, useState } from "react";
import type { IconType } from "react-icons";

import type { ButtonProps, ElementExtendedSize } from "@/types";

interface ToggleProps extends Omit<ButtonProps, 'isLoading' | 'size' | 'spacing' | 'href'> {
    size?: ElementExtendedSize;
    activeIcon?: IconType;
    inactiveIcon?: IconType;
};

export default function Toggle({ size = 'md', activeIcon, inactiveIcon, ...props }: ToggleProps) {
    const { isDisabled = false, isSelected = false, ...restProps } = props;

    const [isActive, setIsActive] = useState<boolean>(isSelected);
    const InactiveIcon = inactiveIcon ?? null;
    const ActiveIcon = activeIcon ?? null;

    useEffect(() => {
        setIsActive(false);
    }, [isDisabled]);

    return (
        <button
            {...restProps}
            disabled={isDisabled}
            onClick={() => setIsActive((prev) => !prev)}
            className={`toggle-${size} aspect-[2/1] flex items-center rounded-full text-xs ${isActive ?
                'bg-blue--hover' :
                'bg-secondary'} transition-all relative ${restProps.className ?? ''}`}>
            {ActiveIcon &&
                <span className={`toggle-icon-container ${isActive ?
                    'showing' :
                    ''}`}>
                    <ActiveIcon className='w-fit h-full aspect-square text-dark' />
                </span>}
            <span className={`w-fit h-full aspect-square rounded-full bg-white will-change-transform transition-all relative top-1/2 left-0 ${isActive ?
                'translate-x-[calc((100%/3)*4)]' :
                ''} -translate-y-1/2 z-10`} />
            {InactiveIcon &&
                <span className={`toggle-icon-container ${isActive ?
                    '' :
                    'showing'}`}>
                    <InactiveIcon className="w-fit h-full aspect-square" />
                </span>}
        </button>
    );
}