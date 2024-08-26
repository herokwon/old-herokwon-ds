interface BackdropProps extends React.ComponentPropsWithoutRef<'section'> {
  variant?: 'global' | 'local';
  isActive?: boolean;
  trigger?: React.ReactNode;
}

export default function Backdrop({
  children,
  variant = 'global',
  trigger,
  ...props
}: BackdropProps) {
  const { isActive = false, ...restProps } = props;

  return (
    <>
      <section
        {...restProps}
        className={`${
          variant === 'local' ? 'absolute size-full' : 'fixed h-screen w-screen'
        } bottom-0 left-0 right-0 top-0 bg-light-primary/bold transition-opacity duration-200 dark:bg-dark-primary/bold ${
          isActive ? 'z-50' : 'pointer-events-none -z-50 opacity-0'
        } ${restProps.className ?? ''}`}
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
