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
      className={`flex w-max ${
        direction === 'horizontal'
          ? 'flex-row items-center'
          : 'flex-col justify-center'
      } gap-2 is-[:hover>*:not(:hover)]:*:opacity-off ${props.className ?? ''}`}
    >
      {children}
    </div>
  );
}
