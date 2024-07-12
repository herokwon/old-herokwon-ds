import { useState } from 'react';

import type {
  ElementBaseSize,
  ElementDirection,
  ElementStates,
  InputProps,
} from '../../types';
import { useInput } from '../../hooks';
import Radio from './Radio';
import InputMessage from './InputMessage';

interface RadioGroupProps
  extends Pick<ElementStates, 'isDisabled'>,
    React.ComponentPropsWithoutRef<'div'> {
  direction?: ElementDirection;
  size?: ElementBaseSize;
  items: React.ComponentProps<typeof Radio>[];
  groupErrorMessage?: InputProps['errorMessage'];
}

export default function RadioGroup({
  direction = 'vertical',
  size = 'md',
  items,
  groupErrorMessage,
  ...props
}: RadioGroupProps) {
  const { isDisabled = false, ...restProps } = props;

  const [groupItems, setGroupItems] = useState<typeof items>([...items]);
  const { hasError, hasMessage } = useInput({
    isDisabled: isDisabled,
    errorMessage: groupErrorMessage,
  });

  return (
    <div
      {...restProps}
      className={`${isDisabled ? 'disabled' : ''} flex ${
        direction === 'horizontal' ? 'flex-row' : 'flex-col'
      } gap-2 ${restProps.className ?? ''}`}
    >
      {groupItems.map(groupItem => (
        <Radio
          {...groupItem}
          key={groupItem.id}
          isDisabled={isDisabled}
          size={size}
          description={
            direction === 'horizontal' ? undefined : groupItem.description
          }
          groupErrorMessage={groupErrorMessage}
          onChange={() =>
            setGroupItems(prevGroupItems =>
              prevGroupItems.map(prevGroupItem => ({
                ...prevGroupItem,
                isSelected: groupItem.id === prevGroupItem.id,
              })),
            )
          }
        />
      ))}
      {!isDisabled && hasMessage && (
        <InputMessage
          hasError={hasError}
          errorMessage={groupErrorMessage}
          className={size === 'lg' ? 'text-sm' : ''}
        />
      )}
    </div>
  );
}
