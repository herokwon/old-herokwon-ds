import { useEffect, useRef } from 'react';
import { FaXmark } from 'react-icons/fa6';

import Backdrop from './Backdrop';
import IconButton from './IconButton';

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
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    isActive ? modalRef.current?.show() : modalRef.current?.close();
  }, [isActive]);

  return (
    <Backdrop
      isActive={isActive}
      trigger={trigger}
      onClick={onClose}
      className="flex items-center justify-center"
    >
      <dialog
        {...restProps}
        ref={modalRef}
        className={`block min-w-[300px] animate-[modal-close_200ms_forwards] rounded-ms border border-light-tertiary bg-light-primary px-4 py-3 text-light shadow-primary-light shadow-light-tertiary transition-opacity duration-200 open:animate-[modal-open_200ms_forwards] not-open:pointer-events-none not-open:opacity-0 dark:border-dark-tertiary dark:bg-dark-secondary dark:text-dark dark:shadow-primary-dark ${restProps.className ?? ''}`}
      >
        <section className="w-full">
          <IconButton
            icon={FaXmark}
            spacing="none"
            shape="square"
            className="ml-auto mr-0 hover:!bg-light-secondary dark:hover:!bg-dark-tertiary"
            onClick={onClose}
          />
          <div className="p-1">{children}</div>
        </section>
      </dialog>
    </Backdrop>
  );
}
