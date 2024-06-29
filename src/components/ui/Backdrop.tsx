import { useEffect, useRef, useState } from "react";

interface BackdropProps extends React.ComponentPropsWithoutRef<'section'> {
    isActive?: boolean;
    triggerItem?: React.ReactElement;
};

export default function Backdrop({ children, isActive = false, triggerItem, ...props }: BackdropProps) {
    const [isActiveBackdrop, setIsActiveBackdrop] = useState<boolean>(isActive);
    const backdropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsActiveBackdrop(isActive);
    }, [isActive]);

    useEffect(() => {
        if (!backdropRef.current || !isActiveBackdrop) return;
        backdropRef.current.onclick = (e) => {
            isActiveBackdrop && backdropRef.current?.contains(e.target as Node | null) &&
                setIsActiveBackdrop(false);
        };
    }, [isActiveBackdrop]);

    return (
        <section {...props} className="w-full h-full">
            <div ref={backdropRef} className={`w-screen h-screen bg-light-primary/bold dark:bg-dark-primary/bold ${isActiveBackdrop ?
                '' :
                'hidden pointer-events-none'} fixed top-0 bottom-0 left-0 right-0 z-50`}>
                {children}
            </div>
            <div>
                {triggerItem}
            </div>
        </section>
    );
}