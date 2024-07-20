import type { ElementStatus, InputProps, PropsWithChildren } from '../../types';
import { RadioProvider } from '../../contexts';

type RadioGroupProps = PropsWithChildren<
  Pick<ElementStatus, 'isDisabled'> &
    Pick<InputProps, 'label' | 'errorMessage'> &
    Omit<React.ComponentPropsWithoutRef<'fieldset'>, 'onChange'> & {
      defaultSelectedId: string;
    }
>;

export default function RadioGroup({
  children,
  label,
  defaultSelectedId,
  errorMessage,
  ...props
}: RadioGroupProps) {
  const { isDisabled = false, ...restProps } = props;

  return (
    <fieldset
      {...restProps}
      disabled={isDisabled}
      className={`w-full space-y-2 ${restProps.className ?? ''}`}
    >
      {label && <legend>{label}</legend>}
      <RadioProvider
        isDisabled={isDisabled}
        defaultSelectedId={defaultSelectedId}
      >
        {children}
      </RadioProvider>
    </fieldset>
  );
}
