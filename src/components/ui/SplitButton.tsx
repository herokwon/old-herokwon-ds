import { useMemo, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

import type {
  ButtonProps,
  DropdownFlatItem,
  ElementBaseVariant,
  ElementSpacing,
  ElementEventHandler,
} from '../../types';
import TextButton from './TextButton';
import IconButton from './IconButton';
import Dropdown from './Dropdown';

type SplitButtonItem = DropdownFlatItem &
  ElementEventHandler<HTMLButtonElement, 'onClick'>;

interface SplitButtonProps extends Omit<ButtonProps, 'spacing' | 'href'> {
  defaultLabel?: string;
  variant?: Exclude<ElementBaseVariant, 'secondary'>;
  spacing?: Exclude<ElementSpacing, 'none'>;
  items: SplitButtonItem[];
  setItems: React.Dispatch<React.SetStateAction<SplitButtonItem[]>>;
}

export default function SplitButton({
  defaultLabel,
  variant = 'default',
  size = 'md',
  spacing = 'default',
  items,
  setItems,
  ...props
}: SplitButtonProps) {
  const {
    stopPropagation = false,
    preventDefault = false,
    isDisabled = false,
    isSelected = false,
    isLoading = false,
    ...restProps
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(isSelected);
  const selectedItem = useMemo(
    () => items.find(item => item.isSelected) ?? null,
    [items],
  );

  return (
    <Dropdown.Wrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      triggerItem={
        <div className="flex h-full" onClick={e => e.stopPropagation()}>
          <TextButton
            {...restProps}
            isDisabled={isDisabled}
            isSelected={isOpen}
            isLoading={isLoading}
            label={selectedItem?.heading ?? defaultLabel ?? ''}
            variant={variant}
            size={size}
            spacing={spacing}
            title={selectedItem?.description}
            className="rounded-r-none"
            onClick={selectedItem?.onClick}
          />
          <div
            className={`min-h-full w-1 ${
              isDisabled
                ? 'disabled'
                : variant === 'primary'
                  ? 'bg-dark-blue dark:bg-light-blue'
                  : 'bg-light-tertiary dark:bg-dark-secondary'
            } transition-all`}
          />
          <IconButton
            isDisabled={isDisabled}
            icon={FaChevronDown}
            variant={variant}
            size={size === 'lg' ? 'md' : size === 'sm' ? 'xs' : 'sm'}
            spacing={spacing}
            shape="square"
            className={`rounded-l-none ${
              isOpen ? 'first:*:rotate-180' : ''
            } first:*:transition-all`}
            onClick={() => setIsOpen(prev => !prev)}
          />
        </div>
      }
    >
      <Dropdown.FlatItems
        selectingInput="text"
        items={items}
        setItems={setItems}
      />
    </Dropdown.Wrapper>
  );
}
