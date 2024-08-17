import type { AlignmentX, PropsWithChildren } from '../../types';

type TagGroupProps = PropsWithChildren<
  React.ComponentPropsWithoutRef<'div'> & {
    focusMode?: boolean;
    alignment?: AlignmentX;
  }
>;

export default function TagGroup({
  children,
  focusMode = true,
  alignment = 'left',
  ...props
}: TagGroupProps) {
  return (
    <div
      {...props}
      className={`flex w-full flex-wrap items-center gap-2 ${
        alignment === 'left'
          ? 'justify-start'
          : alignment === 'right'
            ? 'justify-end'
            : 'justify-center'
      } ${focusMode ? 'is-[:hover>*:not(:hover)]:*:opacity-off' : ''} ${props.className ?? ''}`}
    >
      {children}
    </div>
  );
}
