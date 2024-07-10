import type { ElementBaseSize, ElementSpacing, ElementStates, ElementWithHref } from "..";

export interface ButtonProps extends ElementStates, ElementWithHref, Omit<React.ComponentPropsWithoutRef<'button'>, 'disabled' | 'children'> {
    size?: ElementBaseSize;
    spacing?: ElementSpacing;
    stopPropagation?: boolean;
    preventDefault?: boolean;
}