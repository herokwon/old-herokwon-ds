import { LuLoader2 } from "react-icons/lu";

import type { ElementExtendedSize } from "../../types";
import { ICON_SIZE } from "../../data/constant";

interface SpinnerProps extends Omit<React.ComponentPropsWithoutRef<'svg'>, 'children'> {
    size?: ElementExtendedSize;
};

export default function Spinner({ size = 'md', ...props }: SpinnerProps) {
    return (
        <LuLoader2
            {...props}
            size={ICON_SIZE[size]}
            className={`text-light-blue dark:text-dark-blue animate-[spinner_1s_ease-in-out_infinite] ${props.className ?? ''}`} />
    );
}