import { useRouter } from 'next/navigation';

import type {
  ElementWithHref,
  PolymorphicElementPropsWithoutRef,
} from '../types';

import Box from './Box';

type LinkableElementProps<T extends React.ElementType> =
  PolymorphicElementPropsWithoutRef<T, ElementWithHref>;

type LinkElementProps<T extends React.ElementType = 'div'> =
  LinkableElementProps<T> & Required<ElementWithHref>;

const LinkElement = <T extends React.ElementType = 'div'>({
  children,
  as,
  href,
  ...props
}: LinkElementProps<T>) => {
  const { push, replace } = useRouter();

  return (
    <Box
      {...props}
      as={as ?? 'div'}
      className={`linkable !transition-[background-size,_color] ${props.className ?? ''}`}
      onClick={e => {
        props.onClick?.(e);
        href && (href.replace ? replace(href.to) : push(href.to));
      }}
    >
      {children}
    </Box>
  );
};

export default function LinkableElement<T extends React.ElementType = 'div'>({
  children,
  as,
  href,
  ...props
}: LinkableElementProps<T>) {
  if (href)
    return (
      <LinkElement {...props} as={as ?? 'div'} href={href}>
        {children}
      </LinkElement>
    );
  return (
    <Box {...props} as={as ?? 'div'}>
      {children}
    </Box>
  );
}
