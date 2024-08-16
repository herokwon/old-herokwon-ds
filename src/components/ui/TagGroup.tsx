import type { AlignmentX, PropsWithChildren } from '../../types';

type TagGroupProps = PropsWithChildren<
  React.ComponentPropsWithoutRef<'div'> & {
    alignment?: AlignmentX;
  }
>;

export default function TagGroup({
  children,
  alignment = 'left',
  ...props
}: TagGroupProps) {
  return (
    <div
      {...props}
      className={`flex w-full flex-wrap ${
        alignment === 'left'
          ? 'justify-start'
          : alignment === 'right'
            ? 'justify-end'
            : 'justify-center'
      } max items-center gap-2 is-[:hover>*:not(:hover)]:*:opacity-off ${props.className ?? ''}`}
    >
      {children}
    </div>
  );
}
