import React, {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FaChevronDown } from 'react-icons/fa6';

import type {
  AbsolutePosition,
  DropdownFlatItem,
  DropdownGroupItem,
  DropdownItemList,
  ElementBaseSize,
  ElementStates,
} from '../../types';
import TextButton from './TextButton';
import Checkbox from '../form/Checkbox';
import Radio from '../form/Radio';
import Empty from './Empty';

type DropdownChildren = React.ReactElement<{
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}>;

interface DropdownProps
  extends Omit<ElementStates, 'isSelected'>,
    React.ComponentPropsWithoutRef<'div'> {
  children: DropdownChildren | DropdownChildren[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  size?: ElementBaseSize;
  position?: AbsolutePosition;
  triggerEvent?: Extract<keyof HTMLElementEventMap, 'click' | 'mouseenter'>;
  triggerItem?: string | React.ReactElement;
  emptyMessage?: string;
}

type DropdownItemsProps<T extends DropdownFlatItem | DropdownGroupItem> =
  DropdownItemList<T> & Partial<Pick<DropdownProps, 'isOpen' | 'setIsOpen'>>;

const Dropdown = ({
  children,
  size = 'md',
  position = 'bottom-center',
  triggerEvent = 'click',
  triggerItem,
  emptyMessage,
  ...props
}: DropdownProps) => {
  const {
    isDisabled = false,
    isLoading = false,
    isOpen,
    setIsOpen,
    ...restProps
  } = props;

  const [maxHeight, setMaxHeight] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updateContainerMaxHeight = () => {
    const dropdownItemsContainer = dropdownRef.current?.lastElementChild;
    setMaxHeight(
      !dropdownItemsContainer
        ? 0
        : document.documentElement.scrollHeight -
            dropdownItemsContainer.getBoundingClientRect().top -
            16,
    );
  };

  useEffect(() => {
    if (!isOpen) return;
    const onClickHandle = (e: Event) =>
      isOpen &&
      !dropdownRef.current?.contains(e.target as Node | null) &&
      setIsOpen(false);

    document.addEventListener('click', onClickHandle);
    return () => document.removeEventListener('click', onClickHandle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    updateContainerMaxHeight();
    window.addEventListener('resize', updateContainerMaxHeight);
    return () => window.removeEventListener('resize', updateContainerMaxHeight);
  }, []);

  return (
    <div
      {...restProps}
      ref={dropdownRef}
      className={`relative ${restProps.className ?? ''}`}
    >
      <div
        onClick={() =>
          !isDisabled &&
          triggerEvent !== 'mouseenter' &&
          setIsOpen(prev => !prev)
        }
        onMouseEnter={() =>
          !isDisabled && triggerEvent === 'mouseenter' && setIsOpen(true)
        }
        onMouseLeave={() =>
          !isDisabled && triggerEvent === 'mouseenter' && setIsOpen(false)
        }
        className={`dropdown-trigger ${isDisabled ? 'disabled' : ''}`}
      >
        {typeof triggerItem !== 'string' || triggerItem.length === 0 ? (
          triggerItem
        ) : (
          <TextButton
            label={triggerItem}
            size={size}
            isDisabled={isDisabled}
            className={`${
              isOpen ? 'last:*:rotate-180' : ''
            } last:*:transition-all`}
            iconAfter={{
              content: FaChevronDown,
              size: size === 'lg' ? 'md' : size === 'sm' ? 'xs' : 'sm',
            }}
          />
        )}
      </div>
      <div
        className={`dropdown-items-container ${
          isOpen ? 'open' : ''
        } to-${position}`}
      >
        <div
          className={`dropdown-items-inner ${
            Children.count(children) > 1 ? 'flex' : ''
          } ${isLoading ? '' : ''}`}
          style={{
            maxHeight: `${maxHeight}px`,
          }}
        >
          {Children.map(children, child => {
            if (!isValidElement(child)) return child;
            return cloneElement(child as React.ReactElement, {
              isOpen: isOpen,
              setIsOpen,
            });
          })}
        </div>
      </div>
    </div>
  );
};

const FlatItems = ({
  selectingInput,
  isOpen,
  items,
  setIsOpen,
  setItems,
}: DropdownItemsProps<DropdownFlatItem>) => {
  const flatItemsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!flatItemsRef.current || !isOpen || !setIsOpen) return;
    flatItemsRef.current.parentElement?.childElementCount === 1 &&
      (selectingInput === 'text' || selectingInput === 'radio') &&
      setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return items.length === 0 ? (
    <Empty />
  ) : (
    <ul ref={flatItemsRef} className="dropdown-items-list--flat">
      {items.map(flatItem => (
        <li
          key={flatItem.id}
          id={flatItem.id}
          data-input={selectingInput}
          className={`dropdown-item ${
            flatItem.isDisabled
              ? 'disabled'
              : flatItem.isSelected
                ? 'selected'
                : ''
          }`}
          onClick={() =>
            !flatItem.isDisabled &&
            selectingInput.includes('text') &&
            setItems(prevFlatItems =>
              prevFlatItems.map(prevFlatItem => ({
                ...prevFlatItem,
                isSelected:
                  selectingInput === 'text'
                    ? prevFlatItem.id === flatItem.id
                    : prevFlatItem.id === flatItem.id
                      ? !prevFlatItem.isSelected
                      : prevFlatItem.isSelected,
              })),
            )
          }
        >
          {selectingInput === 'radio' ? (
            <Radio
              id={flatItem.id}
              isDisabled={flatItem.isDisabled}
              isSelected={flatItem.isSelected}
              heading={flatItem.heading}
              description={flatItem.description}
              onChange={() =>
                setItems(prevFlatItems =>
                  prevFlatItems.map(prevFlatItem => ({
                    ...prevFlatItem,
                    isSelected: prevFlatItem.id === flatItem.id,
                  })),
                )
              }
            />
          ) : selectingInput === 'checkbox' ? (
            <Checkbox
              id={flatItem.id}
              isDisabled={flatItem.isDisabled}
              isSelected={flatItem.isSelected}
              heading={flatItem.heading}
              description={flatItem.description}
              onChange={() =>
                setItems(prevFlatItems =>
                  prevFlatItems.map(prevFlatItem => ({
                    ...prevFlatItem,
                    isSelected:
                      prevFlatItem.id === flatItem.id
                        ? !prevFlatItem.isSelected
                        : prevFlatItem.isSelected,
                  })),
                )
              }
            />
          ) : (
            <div className="w-full">
              <p className="dropdown-item-heading">{flatItem.heading}</p>
              {flatItem.description && (
                <p className="dropdown-item-description">
                  {flatItem.description}
                </p>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

const GroupItems = ({
  isOpen,
  items,
  setIsOpen,
  setItems,
}: DropdownItemsProps<DropdownGroupItem>) => {
  const inputsOfGroupItems = useMemo(
    () => Array.from(new Set(items.map(groupItem => groupItem.selectingInput))),
    [items],
  );

  const renderGroupHeading = (heading: string): string => {
    if (heading.length === 0) return '';
    return heading[0].toUpperCase() + heading.substring(1).toLowerCase();
  };

  useEffect(() => {
    if (!isOpen || !setIsOpen) return;
    inputsOfGroupItems.length === 1 &&
      inputsOfGroupItems[0] === 'text' &&
      setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return items.length === 0 ? (
    <Empty />
  ) : (
    items.map(groupItem => (
      <div key={groupItem.id} className="w-full">
        <div className="dropdown-items-label">
          {groupItem.selectingInput === 'multi-text' ||
          groupItem.selectingInput === 'checkbox' ? (
            <Checkbox
              id={groupItem.id}
              heading={renderGroupHeading(groupItem.heading)}
              isSelected={groupItem.items.reduce(
                (acc, item) => acc && (item.isSelected ?? false),
                true,
              )}
              onChange={() =>
                setItems(prevGroupItems =>
                  prevGroupItems.map(prevGroupItem => ({
                    ...prevGroupItem,
                    items: prevGroupItem.items.map(prevItem => ({
                      ...prevItem,
                      isSelected:
                        prevGroupItem.id !== groupItem.id
                          ? prevItem.isSelected
                          : !prevGroupItem.items.reduce(
                              (acc, prevItem) =>
                                acc && (prevItem.isSelected ?? false),
                              true,
                            ),
                    })),
                  })),
                )
              }
            />
          ) : (
            <p>{renderGroupHeading(groupItem.heading)}</p>
          )}
        </div>
        <ul className="dropdown-items-list--group">
          {groupItem.items.map(item => (
            <li
              key={item.id}
              data-input={groupItem.selectingInput}
              className={`dropdown-item group ${
                item.isDisabled ? 'disabled' : item.isSelected ? 'selected' : ''
              }`}
              onClick={() =>
                !item.isDisabled &&
                groupItem.selectingInput.includes('text') &&
                setItems(prevGroupItems =>
                  prevGroupItems.map(prevGroupItem => ({
                    ...prevGroupItem,
                    items: prevGroupItem.items.map(prevItem => ({
                      ...prevItem,
                      isSelected:
                        groupItem.selectingInput === 'text'
                          ? prevGroupItem.id === groupItem.id
                            ? prevItem.id === item.id
                            : prevItem.isSelected
                          : prevItem.id === item.id
                            ? !prevItem.isSelected
                            : prevItem.isSelected,
                    })),
                  })),
                )
              }
            >
              {groupItem.selectingInput === 'radio' ? (
                <Radio
                  {...item}
                  onChange={() =>
                    setItems(prevGroupItems =>
                      prevGroupItems.map(prevGroupItem => ({
                        ...prevGroupItem,
                        items: prevGroupItem.items.map(prevItem => ({
                          ...prevItem,
                          isSelected:
                            prevGroupItem.id === groupItem.id
                              ? prevItem.id === item.id
                              : prevItem.isSelected,
                        })),
                      })),
                    )
                  }
                />
              ) : groupItem.selectingInput === 'checkbox' ? (
                <Checkbox
                  {...item}
                  onChange={() =>
                    setItems(prevGroupItems =>
                      prevGroupItems.map(prevGroupItem => ({
                        ...prevGroupItem,
                        items: prevGroupItem.items.map(prevItem => ({
                          ...prevItem,
                          isSelected:
                            prevItem.id === item.id
                              ? !prevItem.isSelected
                              : prevItem.isSelected,
                        })),
                      })),
                    )
                  }
                />
              ) : (
                <div className="w-full">
                  <p className="dropdown-item-heading">{item.heading}</p>
                  {item.description && (
                    <p className="dropdown-item-description">
                      {item.description}
                    </p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    ))
  );
};

Dropdown.FlatItems = FlatItems;
Dropdown.GroupItems = GroupItems;

export default Dropdown;
