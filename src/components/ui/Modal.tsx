import { useEffect, useRef, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';

import IconButton from './IconButton';
import Backdrop from './Backdrop';

interface ModalProps extends React.ComponentPropsWithoutRef<'dialog'> {
  children: React.ReactNode;
  isActive?: boolean;
  trigger?: React.ReactNode;
  onClose?: () => void;
}

export default function Modal({
  children,
  trigger,
  onClose,
  ...props
}: ModalProps) {
  const { isActive = false, ...restProps } = props;
  const [isOpen, setIsOpen] = useState<boolean>(isActive);
  const modalRef = useRef<HTMLDialogElement>(null);

  const closeModal = (): void => {
    if (!modalRef.current?.open) return;
    modalRef.current.onanimationend = () => {
      setIsOpen(false);
      isActive && onClose?.();
    };
    modalRef.current.classList.add('close');
  };

  useEffect(() => {
    isActive ? setIsOpen(true) : closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <Backdrop isActive={isOpen} trigger={trigger}>
      <dialog
        {...restProps}
        ref={modalRef}
        open={isOpen}
        className={`min-w-[300px] rounded-ms border border-light-tertiary bg-light-primary px-4 py-3 text-light shadow-primary-light shadow-light-tertiary dark:border-dark-tertiary dark:bg-dark-secondary dark:text-dark dark:shadow-primary-dark ${restProps.className ?? ''}`}
      >
        <section className="w-full">
          <IconButton
            icon={FaXmark}
            spacing="none"
            shape="square"
            className="ml-auto mr-0 hover:!bg-light-secondary dark:hover:!bg-dark-tertiary"
            onClick={closeModal}
          />
          <div className="p-1">{children}</div>
        </section>
      </dialog>
    </Backdrop>
  );
}
