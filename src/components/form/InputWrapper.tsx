import { useInput } from '../../hooks';

interface InputWrapperProps
  extends Pick<ReturnType<typeof useInput<HTMLInputElement>>, 'onFocusInput'>,
    React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  isFocused: boolean;
  hasError: boolean;
}

export default function InputWrapper({
  children,
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
        props.onClick && props.onClick(e);
      }}
      className={`flex w-full items-center rounded-ms border ${
        isFocused
          ? hasError
            ? 'border-light-red dark:border-dark-red'
            : 'border-light-blue dark:border-dark-blue'
          : 'border-light-tertiary dark:border-dark-tertiary'
      } cursor-pointer overflow-hidden bg-light-primary transition-all dark:bg-dark-secondary ${props.className ?? ''}`}
    >
      {children}
    </div>
  );
}
