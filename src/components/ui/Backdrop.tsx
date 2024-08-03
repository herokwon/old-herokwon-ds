interface BackdropProps extends React.ComponentPropsWithoutRef<'section'> {
  isActive: boolean;
  trigger?: React.ReactNode;
}

export default function Backdrop({
  children,
  trigger,
  ...props
}: BackdropProps) {
  const { isActive, ...restProps } = props;

  return (
    <>
      <section
        {...restProps}
        className={`fixed bottom-0 left-0 right-0 top-0 h-screen w-screen overflow-y-auto bg-light-primary/bold transition-opacity duration-200 dark:bg-dark-primary/bold ${isActive ? 'z-50' : 'pointer-events-none -z-50 opacity-0'} ${restProps.className ?? ''}`}
        onClick={e => {
          !e.currentTarget.firstElementChild?.contains(
            e.target as Node | null,
          ) && restProps.onClick?.(e);
        }}
      >
        {children}
      </section>
      {trigger}
    </>
  );
}
