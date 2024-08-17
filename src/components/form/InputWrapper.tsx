import type { ElementBaseSize } from '../../types';

import { useInput } from '../../hooks';

interface InputWrapperProps
  extends Pick<
      ReturnType<typeof useInput<HTMLInputElement>>,
      'isFocused' | 'hasError' | 'onFocusInput'
    >,
    React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  size: ElementBaseSize;
}

export default function InputWrapper({
  children,
  size,
  isFocused,
  hasError,
  onFocusInput,
  ...props
}: InputWrapperProps) {
  return (
    <div
      {...props}
      onClick={e => {
        onFocusInput();
        props.onClick?.(e);
      }}
      className={`flex w-full items-center border-b py-1 ${
        isFocused
          ? hasError
            ? 'border-light-red last:*:caret-light-red dark:border-dark-red dark:last:*:caret-dark-red'
            : 'border-light-blue last:*:caret-light-blue dark:border-dark-blue dark:last:*:caret-dark-blue'
          : 'border-light-tertiary dark:border-dark-tertiary'
      } ${
        size === 'lg' ? 'text-lg' : size === 'sm' ? 'text-sm' : 'text-base'
      } overflow-hidden bg-light-primary transition-all dark:bg-dark-secondary ${props.className ?? ''}`}
      style={{
        maxHeight: `calc(${size === 'lg' ? 1.75 : size === 'sm' ? 1.25 : 1.5}rem + (0.25rem * 2) + 1px)`,
      }}
    >
      {children}
    </div>
  );
}
