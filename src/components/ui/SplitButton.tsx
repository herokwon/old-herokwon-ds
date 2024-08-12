import { useMemo, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

import type {
  ElementBaseVariant,
  ElementEventHandler,
  ElementSpacing,
  ElementStatus,
  ElementWithHref,
} from '../../types';

import type { ButtonProps, FloatingItem } from '../../types/ui';

import Dropdown from './Dropdown';
import IconButton from './IconButton';
import TextButton from './TextButton';

type SplitButtonItem = FloatingItem<
  Pick<ElementStatus, 'isDisabled'> &
    ElementEventHandler<HTMLElement, 'onClick'>
>;

interface SplitButtonProps
  extends ElementStatus,
    ElementWithHref,
    Omit<ButtonProps, 'spacing'> {
  defaultLabel?: string;
  variant?: Exclude<ElementBaseVariant, 'secondary'>;
  spacing?: Exclude<ElementSpacing, 'none'>;
  items: SplitButtonItem[];
}

export default function SplitButton({
  defaultLabel,
  variant = 'default',
  size = 'md',
  spacing = 'default',
  items,
  ...props
}: SplitButtonProps) {
  const {
    isDisabled = false,
    isSelected = false,
    isLoading = false,
    stopPropagation = false,
    preventDefault = false,
    ...restProps
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(isSelected);
  const [selectedId, setSelectedId] = useState<string>(
    items.length === 0 ? '' : items[0].id,
  );
  const selectedItem = useMemo(
    () => items.find(item => item.id === selectedId) ?? null,
    [items, selectedId],
  );

  return (
    <Dropdown
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trigger={
        <div className="flex h-full" onClick={e => e.stopPropagation()}>
          <TextButton
            {...restProps}
            isDisabled={isDisabled}
            isSelected={isOpen}
            label={selectedItem?.children ?? defaultLabel}
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
                  : 'bg-light-tertiary dark:bg-dark-tertiary'
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
      <Dropdown.TextGroup>
        {items.map(
          ({
            children,
            isDisabled,
            id,
            description,
            elemBefore,
            elemAfter,
          }) => (
            <Dropdown.Text
              key={id}
              isDisabled={isDisabled}
              isSelected={id === selectedId}
              id={id}
              description={description}
              elemBefore={elemBefore}
              elemAfter={elemAfter}
              onClick={() => setSelectedId(id)}
            >
              {children}
            </Dropdown.Text>
          ),
        )}
      </Dropdown.TextGroup>
    </Dropdown>
  );
}
