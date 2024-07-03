interface BackdropProps extends React.ComponentPropsWithoutRef<'section'> {
    isActive: boolean;
    triggerItem?: React.ReactElement;
    onClickBackdrop?: React.MouseEventHandler<HTMLDivElement>;
};

export default function Backdrop({ children, triggerItem, onClickBackdrop, ...props }: BackdropProps) {
    const { isActive, ...restProps } = props;

    return (
        <section {...restProps}>
            {isActive &&
                <div onClick={(e) => {
                    !e.currentTarget.firstElementChild?.contains(e.target as Node | null) &&
                        onClickBackdrop &&
                        onClickBackdrop(e);
                }} className="w-screen h-screen flex justify-center items-center bg-light-primary/bold dark:bg-dark-primary/bold fixed top-0 bottom-0 left-0 right-0 z-50">
                    {children}
                </div>}
            {triggerItem}
        </section>
    );
}