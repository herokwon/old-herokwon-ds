import type { ElementDirection, PropsWithChildren } from '../../types';

type ButtonGroupProps = PropsWithChildren<
  React.ComponentPropsWithoutRef<'div'> & {
    focusMode?: boolean;
    direction?: ElementDirection;
  }
>;

export default function ButtonGroup({
  children,
  focusMode = true,
  direction = 'horizontal',
  ...props
}: ButtonGroupProps) {
  return (
    <div
      {...props}
      className={`flex w-max gap-2 ${
        direction === 'horizontal'
          ? 'flex-row items-center'
          : 'flex-col justify-center'
      } ${focusMode ? 'is-[:hover>*:not(:hover)]:*:opacity-off' : ''} ${props.className ?? ''}`}
    >
      {children}
    </div>
  );
}
