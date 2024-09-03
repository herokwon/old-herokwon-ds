import { Fragment } from 'react';

import type { PolymorphicElementPropsWithoutRef } from '../types';

type BoxProps<T extends React.ElementType> =
  PolymorphicElementPropsWithoutRef<T>;

export default function Box<T extends React.ElementType>({
  children,
  as,
  ...props
}: BoxProps<T>) {
  const Element = as ?? Fragment;

  return <Element {...props}>{children}</Element>;
}
