import type { ElementStatus, PropsWithChildren } from '../../types';

import type { InputProps } from '../../types/form';

type RadioGroupProps = PropsWithChildren<
  Pick<ElementStatus, 'isDisabled'> &
    Pick<InputProps, 'label'> &
    React.ComponentPropsWithoutRef<'fieldset'>
>;

export default function RadioGroup({
  children,
  label,
  ...props
}: RadioGroupProps) {
  const { isDisabled = false, ...restProps } = props;

  return (
    <fieldset
      {...restProps}
      disabled={isDisabled}
      className={`*:disabled:disabled w-full space-y-2 ${restProps.className ?? ''}`}
    >
      {label && <legend>{label}</legend>}
      {children}
    </fieldset>
  );
}
