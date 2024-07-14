import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from 'react';
import { LuX } from 'react-icons/lu';

import IconButton from './IconButton';
import Backdrop from './Backdrop';

type ModalWrapperChildren = React.ReactElement<{
  isActive?: boolean;
  setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
}>;

interface ModalWrapperProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  children: ModalWrapperChildren | ModalWrapperChildren[];
  triggerItem?: React.ReactElement;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ModalContainerProps extends React.ComponentPropsWithoutRef<'dialog'> {
  id: string;
  isActive?: boolean;
  setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalWrapper = ({
  children,
  triggerItem,
  ...props
}: ModalWrapperProps) => {
  const { isActive = false, setIsActive, ...restProps } = props;

  return (
    <div {...restProps}>
      {triggerItem}
      {Children.map(children, child => {
        if (!isValidElement(child)) return child;
        return cloneElement(child as React.ReactElement, {
          isActive: isActive,
          setIsActive: setIsActive,
        });
      })}
    </div>
  );
};

const ModalContainer = ({ children, id, ...props }: ModalContainerProps) => {
  const { isActive = false, setIsActive, ...restProps } = props;

  const [isOpen, setIsOpen] = useState<boolean>(isActive);
  const closeModal = () => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (!modal?.open) return;
    modal.onanimationend = () => setIsOpen(false);
    modal.classList.add('close');
  };

  useEffect(() => {
    !isOpen && setIsActive && setIsActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    isActive ? setIsOpen(true) : closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <Backdrop isActive={isOpen} onClick={closeModal}>
      <dialog
        {...restProps}
        id={id}
        open={isOpen}
        className={`min-w-[300px] rounded-ms border border-light-tertiary bg-light-primary px-4 py-3 text-light shadow-primary-light dark:border-dark-tertiary dark:bg-dark-secondary dark:text-dark dark:shadow-primary-dark ${restProps.className ?? ''}`}
      >
        <IconButton
          icon={LuX}
          spacing="none"
          className="ml-auto mr-0"
          onClick={closeModal}
        />
        <div className="p-1">{children}</div>
      </dialog>
    </Backdrop>
  );
};

const Modal = {
  Wrapper: ModalWrapper,
  Container: ModalContainer,
};
export default Modal;
