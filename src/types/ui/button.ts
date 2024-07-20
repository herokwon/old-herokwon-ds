import type { ElementBaseSize, ElementSpacing } from '..';

export interface ButtonProps
  extends Omit<
    React.ComponentPropsWithoutRef<'button'>,
    'disabled' | 'children'
  > {
  size?: ElementBaseSize;
  spacing?: ElementSpacing;
  stopPropagation?: boolean;
  preventDefault?: boolean;
}
