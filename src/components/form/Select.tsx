import { useEffect, useState } from 'react';
import { LuX } from 'react-icons/lu';

import type {
  Children,
  ElementStatus,
  FloatingItem,
  InputProps,
  SelectingInput,
} from '../../types';
import Dropdown from '../ui/Dropdown';
import TextField from './TextField';
import IconButton from '../ui/IconButton';
import Tag from '../ui/Tag';
import Box from '../Box';

interface SelectProps
  extends Omit<ElementStatus, 'isSelected'>,
    Pick<
      InputProps,
      'label' | 'placeholder' | 'helperMessage' | 'errorMessage'
    >,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  selectingInput: SelectingInput;
  defaultSelectedId?: string;
  shouldWrapItems?: boolean;
  options: Omit<
    FloatingItem<
      Pick<ElementStatus, 'isDisabled'> & {
        label: Children;
      }
    >,
    'children' | 'elemBefore' | 'elemAfter'
  >[];
}

export default function Select({
  selectingInput,
  defaultSelectedId = '',
  options,
  label,
  placeholder,
  helperMessage,
  errorMessage,
  ...props
}: SelectProps) {
  const {
    isDisabled = false,
    isLoading = false,
    shouldWrapItems = false,
    ...restProps
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>(
    defaultSelectedId.length === 0 ? [] : [defaultSelectedId],
  );

  useEffect(() => {
    (selectingInput === 'text' || selectingInput === 'radio') &&
      setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds]);

  return (
    <Dropdown
      {...restProps}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      className={`w-full last:*:min-w-full only:*:last:*:overflow-y-auto ${restProps.className ?? ''}`}
      trigger={
        <TextField
          readOnly
          autoFocus={isOpen}
          hidden={selectedIds.length > 0}
          placeholder={selectedIds.length > 0 ? '' : placeholder}
          onClick={() => setIsOpen(prev => !prev)}
          className="px-3"
        >
          {selectedIds.length > 0 && (
            <div className="flex w-full items-center py-[0.3125rem]">
              <div
                className={`flex w-full max-w-full gap-1 px-2 ${shouldWrapItems ? 'flex-wrap' : 'overflow-x-auto scrollbar-hide'}`}
                onWheel={e => {
                  if (e.deltaY === 0) return;
                  e.currentTarget.scrollTo({
                    left: e.currentTarget.scrollLeft + e.deltaY,
                    behavior: 'smooth',
                  });
                }}
              >
                {selectedIds.map(selectedId => (
                  <Tag
                    key={selectedId}
                    className="whitespace-nowrap"
                    isRemovable={
                      selectingInput === 'multi-text' ||
                      selectingInput === 'checkbox'
                    }
                    iconAfter={{
                      onClick: () =>
                        setSelectedIds(prev =>
                          prev.filter(value => value !== selectedId),
                        ),
                    }}
                  >
                    {options.find(option => option.id === selectedId)?.label}
                  </Tag>
                ))}
              </div>
              {selectedIds.length > 0 && (
                <IconButton
                  icon={LuX}
                  spacing="compact"
                  className="mx-0.5"
                  onClick={() => setSelectedIds([])}
                />
              )}
            </div>
          )}
        </TextField>
      }
    >
      {
        <Box
          as={
            selectingInput === 'radio'
              ? Dropdown.RadioGroup
              : selectingInput === 'checkbox'
                ? Dropdown.CheckboxGroup
                : Dropdown.TextGroup
          }
        >
          {options.map(({ isDisabled, id, label, description }) => (
            <Box
              key={id}
              id={id}
              isDisabled={isDisabled}
              isSelected={selectedIds.includes(id)}
              description={description}
              as={
                selectingInput === 'radio'
                  ? Dropdown.Radio
                  : selectingInput === 'checkbox'
                    ? Dropdown.Checkbox
                    : Dropdown.Text
              }
              onClick={() =>
                selectingInput.includes('text') &&
                setSelectedIds(
                  selectingInput === 'text'
                    ? [id]
                    : prev =>
                        prev.includes(id)
                          ? prev.filter(value => value !== id)
                          : [...prev, id],
                )
              }
              onChange={() =>
                !selectingInput.includes('text') &&
                setSelectedIds(
                  selectingInput === 'radio'
                    ? [id]
                    : prev =>
                        prev.includes(id)
                          ? prev.filter(value => value !== id)
                          : [...prev, id],
                )
              }
            >
              {label}
            </Box>
          ))}
        </Box>
      }
    </Dropdown>
  );
}
