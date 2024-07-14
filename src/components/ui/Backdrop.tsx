interface BackdropProps extends React.ComponentPropsWithoutRef<'section'> {
  isActive: boolean;
  triggerItem?: React.ReactNode;
}

export default function Backdrop({
  children,
  triggerItem,
  ...props
}: BackdropProps) {
  const { isActive, ...restProps } = props;

  return (
    <>
      {isActive && (
        <section
          {...restProps}
          className="fixed bottom-0 left-0 right-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-light-primary/bold dark:bg-dark-primary/bold"
          onClick={e => {
            !e.currentTarget.firstElementChild?.contains(
              e.target as Node | null,
            ) &&
              restProps.onClick &&
              restProps.onClick(e);
          }}
        >
          {children}
        </section>
      )}
      {triggerItem}
    </>
  );
}
