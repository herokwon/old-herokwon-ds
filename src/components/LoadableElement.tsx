import type { PolymorphicElementPropsWithoutRef } from '../types';
import Box from './Box';
import Backdrop from './ui/Backdrop';
import Spinner from './ui/Spinner';

type _LoadableElementProps = Pick<
  React.ComponentPropsWithoutRef<typeof Spinner>,
  'size'
> & {
  isActive: boolean;
};

type LoadableElementProps<T extends React.ElementType> =
  PolymorphicElementPropsWithoutRef<T, _LoadableElementProps>;

export default function LoadableElement<T extends React.ElementType>({
  children,
  isActive,
  as,
  size = 'md',
  ...props
}: LoadableElementProps<T>) {
  return (
    <Box
      {...props}
      as={as || 'div'}
      className={`${
        isActive ? 'relative first:*:pointer-events-none' : ''
      } ${props.className ?? ''}`}
    >
      {children}
      <Backdrop
        isActive={isActive}
        className="absolute bottom-0 left-0 right-0 top-0 z-40 !h-full !w-full"
      >
        <Spinner size={size} />
      </Backdrop>
    </Box>
  );
}
