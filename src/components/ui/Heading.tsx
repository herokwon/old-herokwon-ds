import type {
  ElementWithHref,
  PolymorphicElementPropsWithoutRef,
} from '../../types';

import LinkableElement from '../LinkableElement';

type HeadingElement = Extract<
  React.ElementType,
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>;

type HeadingProps<T extends HeadingElement> = PolymorphicElementPropsWithoutRef<
  T,
  ElementWithHref
>;

export default function Heading<T extends HeadingElement = 'h1'>({
  children,
  as,
  href,
  ...props
}: HeadingProps<T>) {
  const Element = as ?? 'h1';

  return (
    <LinkableElement {...props} as={Element} href={href}>
      {children}
    </LinkableElement>
  );
}
