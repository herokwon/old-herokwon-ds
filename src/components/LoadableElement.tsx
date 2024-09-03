import type { PolymorphicElementPropsWithoutRef } from '../types';

import Box from './Box';
import Backdrop from './ui/Backdrop';
import Dots from './ui/Dots';
import Spinner from './ui/Spinner';

type _LoadableElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof Spinner>,
  'size'
> & {
  variant?: 'dots' | 'spinner';
  isActive: boolean;
};

type LoadableElementProps<T extends React.ElementType = 'div'> =
  PolymorphicElementPropsWithoutRef<T, _LoadableElementProps>;

export default function LoadableElement<T extends React.ElementType = 'div'>({
  children,
  variant = 'spinner',
  isActive,
  as,
  size = 'md',
  ...props
}: LoadableElementProps<T>) {
  const LoadingElement = variant === 'dots' ? Dots : Spinner;

  return !isActive && !as ? (
    children
  ) : (
    <Box
      {...props}
      as={as ?? 'div'}
      className={`relative ${
        isActive ? 'first:*:pointer-events-none' : ''
      } ${props.className ?? ''}`}
    >
      {children}
      <Backdrop
        variant="local"
        isActive={isActive}
        className="flex items-center justify-center"
      >
        <LoadingElement size={size} />
      </Backdrop>
    </Box>
  );
}
