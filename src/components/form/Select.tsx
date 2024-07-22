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
import IconButton from '../ui/IconButton';
import TagGroup from '../ui/TagGroup';
import Tag from '../ui/Tag';
import TextField from './TextField';
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
    if (
      selectingInput !== 'text' &&
      selectingInput !== 'radio' &&
      selectedIds.length > 0
    )
      return;
    setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds]);

  return (
    <Dropdown
      {...restProps}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      className={`min-w-full last:*:min-w-full only:*:last:*:overflow-y-auto ${restProps.className ?? ''}`}
      trigger={
        <TextField
          readOnly
          autoFocus={isOpen}
          placeholder={selectedIds.length > 0 ? '' : placeholder}
          onClick={() => setIsOpen(prev => !prev)}
          className={selectedIds.length > 0 ? '!w-0 !px-0' : 'px-3'}
        >
          {selectedIds.length > 0 && (
            <div
              className="flex w-full items-center gap-x-2 px-2 py-[0.3125rem]"
              onClick={() => setIsOpen(prev => !prev)}
            >
              <TagGroup
                className={`${
                  shouldWrapItems
                    ? ''
                    : 'flex-nowrap !overflow-x-auto scrollbar-hide'
                }`}
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
                      onClick: e => {
                        e.stopPropagation();
                        setSelectedIds(prev =>
                          prev.filter(value => value !== selectedId),
                        );
                      },
                    }}
                  >
                    {options.find(option => option.id === selectedId)?.label}
                  </Tag>
                ))}
              </TagGroup>
              {selectedIds.length > 0 && (
                <IconButton
                  icon={LuX}
                  spacing="compact"
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
