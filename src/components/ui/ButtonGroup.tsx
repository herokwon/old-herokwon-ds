import type { ElementDirection, PropsWithChildren } from '../../types';

type ButtonGroupProps = PropsWithChildren<
  React.ComponentPropsWithoutRef<'div'> & {
    direction?: ElementDirection;
  }
>;

export default function ButtonGroup({
  children,
  direction = 'horizontal',
  ...props
}: ButtonGroupProps) {
  return (
    <div
      {...props}
      className={`inline-flex ${
        direction === 'horizontal'
          ? 'flex-row items-center'
          : 'flex-col justify-center'
      } gap-2 ${props.className ?? ''}`}
    >
      {children}
    </div>
  );
}
