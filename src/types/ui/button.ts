import type { ElementBaseSize, ElementSpacing, ElementStates } from "..";

export interface ButtonProps extends ElementStates, Omit<React.ComponentPropsWithoutRef<'button'>, 'disabled' | 'children'> {
    size?: ElementBaseSize;
    spacing?: ElementSpacing;
    href?: {
        to: string;
        replace?: boolean;
    };
}