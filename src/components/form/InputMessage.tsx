import { FaCircleExclamation } from 'react-icons/fa6';

import type { InputProps } from '../../types/form';

interface InputMessageProps
  extends Pick<InputProps, 'helperMessage' | 'errorMessage'>,
    React.ComponentPropsWithoutRef<'p'> {
  hasError: boolean;
}

export default function InputMessage({
  hasError,
  helperMessage,
  errorMessage,
  ...props
}: InputMessageProps) {
  return (
    <p
      {...props}
      className={`flex w-full items-center text-xs ${
        errorMessage ? 'text-light-red dark:text-dark-red' : 'opacity-normal'
      } whitespace-pre-wrap ${props.className ?? ''}`}
    >
      {hasError && <FaCircleExclamation className="mr-1" />}
      {errorMessage ?? helperMessage}
    </p>
  );
}
