import type { PolymorphicElementPropsWithoutRef } from '../types';

type BoxProps<T extends React.ElementType = 'div'> =
  PolymorphicElementPropsWithoutRef<T>;

export default function Box<T extends React.ElementType = 'div'>({
  children,
  as,
  ...props
}: BoxProps<T>) {
  const Element = as || 'div';

  return <Element {...props}>{children}</Element>;
}
