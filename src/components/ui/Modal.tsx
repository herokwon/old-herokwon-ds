import { Children, cloneElement, forwardRef, isValidElement, useEffect, useState } from "react";
import { LuX } from "react-icons/lu";

import IconButton from "./IconButton";
import Backdrop from "./Backdrop";

type ModalWrapperChildren = React.ReactElement<{
    isActive?: boolean;
}>;

interface ModalWrapperProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
    children: ModalWrapperChildren | ModalWrapperChildren[];
    isActive?: boolean;
};

interface ModalContainerProps extends React.ComponentPropsWithoutRef<'dialog'> {
    id: string;
    isActive?: boolean;
};

const Wrapper = ({ children, ...props }: ModalWrapperProps) => {
    return (
        <div {...props}>
            {Children.map(children, (child) => {
                if (!isValidElement(child)) return child;
                return cloneElement(child as React.ReactElement, {
                    isActive: props.isActive ?? false,
                });
            })}
        </div>
    );
};

const Container = forwardRef<HTMLDialogElement, ModalContainerProps>(function Modal({ children, id, ...props }, ref) {
    const { isActive = false, ...restProps } = props;

    const [isActiveModal, setIsActiveModal] = useState<boolean>(isActive);

    useEffect(() => {
        setIsActiveModal(isActive);
    }, [isActive]);

    return (
        <Backdrop isActive={isActiveModal}>
            <dialog
                {...restProps}
                ref={ref}
                id={id}
                open={isActiveModal}
                className={`min-w-[300px] p-4 !m-0 rounded-ms text-light dark:text-dark bg-light-primary dark:bg-dark-secondary shadow-primary-light dark:shadow-primary-dark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${restProps.className ?? ''}`}>
                <IconButton
                    icon={LuX}
                    spacing='none'
                    className='ml-auto mr-0'
                    onClick={() => setIsActiveModal(false)} />
                <div className="p-1">
                    {children}
                </div>
            </dialog>
        </Backdrop>
    );
});

const Modal = {
    Wrapper,
    Container,
};

export default Modal;