import { useRouter } from 'next/navigation';

import type {
  ElementWithHref,
  PolymorphicElementPropsWithoutRef,
} from '../types';

import Box from './Box';

type LinkableElementProps<T extends React.ElementType> =
  PolymorphicElementPropsWithoutRef<T, ElementWithHref>;

export default function LinkableElement<T extends React.ElementType>({
  children,
  as,
  href,
  ...props
}: LinkableElementProps<T>) {
  const { push, replace } = useRouter();

  return (
    <Box
      {...props}
      as={as || 'div'}
      className={`${href ? 'linkable !transition-[background-size,_color]' : ''} ${props.className ?? ''}`}
      onClick={e => {
        props.onClick?.(e);
        href && (href.replace ? replace(href.to) : push(href.to));
      }}
    >
      {children}
    </Box>
  );
}
