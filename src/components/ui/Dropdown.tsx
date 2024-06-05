import { useEffect, useMemo, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

import type { AbsolutePosition, DropdownFlatItem, DropdownGroupItem, DropdownItemList, ElementBaseSize, ElementStates } from "@/types";
import TextButton from "./TextButton";

interface DropdownProps extends Omit<ElementStates, 'isSelected'>, React.ComponentPropsWithoutRef<'div'> {
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    size?: ElementBaseSize;
    position?: AbsolutePosition;
    triggerEvent?: Extract<keyof HTMLElementEventMap, 'click' | 'mouseenter'>;
    triggerItem?: string | React.ReactElement;
    emptyMessage?: string;
};

type DropdownItemsProps<T extends DropdownFlatItem | DropdownGroupItem> = DropdownItemList<T> & Pick<DropdownProps, 'isOpen' | 'setIsOpen'>;

const EMPTY_MESSAGE = '선택 가능한 데이터가 없습니다.';

const Dropdown = ({ children, size = 'md', position = 'bottom-center', triggerEvent = 'click', triggerItem, emptyMessage = EMPTY_MESSAGE, ...props }: DropdownProps) => {
    const { isDisabled = false, isLoading = false, isOpen, setIsOpen, ...rest } = props;

    const [maxHeight, setMaxHeight] = useState<number>(0);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const updateContainerMaxHeight = () => {
        const dropdownItemsContainer = dropdownRef.current?.lastElementChild;
        setMaxHeight(!dropdownItemsContainer ?
            0 :
            document.documentElement.scrollHeight - dropdownItemsContainer.getBoundingClientRect().top - 16);
    };

    useEffect(() => {
        if (!isOpen) return;

        const handleClick = (e: Event) =>
            isOpen &&
            !dropdownRef.current?.contains(e.target as Node | null) &&
            setIsOpen(false);

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    useEffect(() => {
        updateContainerMaxHeight();
        window.addEventListener('resize', updateContainerMaxHeight);
        return () => window.removeEventListener('resize', updateContainerMaxHeight);
    }, []);

    return (
        <div
            {...Object.fromEntries(Object.entries(rest).filter((item) =>
                item[0] !== 'isGroupBy' &&
                item[0] !== 'items' &&
                item[0] !== 'selectingInput'))}
            ref={dropdownRef}
            className={`relative ${rest.className ?? ''}`}>
            <div
                onClick={() => triggerEvent !== 'mouseenter' &&
                    setIsOpen((prev) => !prev)}
                onMouseEnter={() => triggerEvent === 'mouseenter' &&
                    setIsOpen((prev) => !prev)}
                className={`dropdown-trigger ${isDisabled ?
                    'disabled' :
                    ''}`}>
                {typeof triggerItem !== 'string' || triggerItem.length === 0 ?
                    triggerItem :
                    <TextButton
                        label={triggerItem}
                        size={size}
                        isDisabled={isDisabled}
                        className={`${isOpen ?
                            'last:*:rotate-180' :
                            ''} last:*:transition-all`}
                        iconAfter={{
                            content: FaChevronDown,
                            size: size === 'lg' ?
                                'md' :
                                size === 'sm' ?
                                    'xs' :
                                    'sm'
                        }} />}
            </div>
            <div className={`dropdown-items-container ${isOpen ?
                'open' :
                ''} to-${position}`}>
                <div className={`dropdown-items-inner ${isLoading ?
                    '' :
                    ''}`} style={{
                        maxHeight: `${maxHeight}px`,
                    }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

const FlatItems = ({ selectingInput, isOpen, items, setIsOpen, setItems }: DropdownItemsProps<DropdownFlatItem>) => {
    useEffect(() => {
        if (!isOpen) return;

        switch (selectingInput) {
            case 'text': case 'radio':
                setIsOpen(false);
                break;
            case 'multi-text': case 'checkbox':
                !items.find((item) => item.isSelected) &&
                    setIsOpen(false);
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    return (
        <ul className="dropdown-items-list--flat">
            {items.map((flatItem) =>
                <li
                    key={flatItem.id}
                    className={`dropdown-item ${flatItem.isDisabled ?
                        'disabled' :
                        flatItem.isSelected ?
                            'selected' :
                            ''}`}
                    onClick={() => setItems((prevFlatItems) =>
                        prevFlatItems.map((prevFlatItem) => ({
                            ...prevFlatItem,
                            isSelected: (selectingInput === 'text' || selectingInput === 'radio') ?
                                prevFlatItem.id === flatItem.id :
                                prevFlatItem.id === flatItem.id ?
                                    !prevFlatItem.isSelected :
                                    prevFlatItem.isSelected
                        })))}>
                    <p className="dropdown-item-heading">
                        {flatItem.heading}
                    </p>
                    {flatItem.description &&
                        <p className="dropdown-item-description">
                            {flatItem.description}
                        </p>}
                </li>)}
        </ul>
    );
};

const GroupItems = ({ isOpen, items, setIsOpen, setItems }: DropdownItemsProps<DropdownGroupItem>) => {
    const inputsOfGroupItems = useMemo(() =>
        Array.from(new Set(items.map((groupItem) => groupItem.selectingInput))), [items]);
    const isNotSelected = useMemo(() =>
        items.reduce((acc, groupItem) =>
            acc && groupItem.items.filter((item) =>
                item.isSelected).length === 0, true), [items]);

    useEffect(() => {
        if (!isOpen) return;

        ((inputsOfGroupItems.length === 1 && inputsOfGroupItems[0] === 'text') || isNotSelected) &&
            setIsOpen(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    return (
        items.map((groupItem) =>
            <div
                key={groupItem.id}
                data-groupby={groupItem.id}
                className="w-full">
                <p className="dropdown-items-label">
                    {groupItem.heading}
                </p>
                <ul className="dropdown-items-list--group">
                    {groupItem.items.map((item) =>
                        <li
                            key={item.id}
                            className={`dropdown-item ${item.isDisabled ?
                                'disabled' :
                                item.isSelected ?
                                    'selected' :
                                    ''}`}
                            onClick={() => setItems((prevGroupItems) =>
                                prevGroupItems.map((prevGroupItem) => ({
                                    ...prevGroupItem,
                                    items: prevGroupItem.items.map((prevItem) => ({
                                        ...prevItem,
                                        isSelected: (prevGroupItem.selectingInput === 'text' || prevGroupItem.selectingInput === 'radio') ?
                                            (prevGroupItem.id === groupItem.id ?
                                                prevItem.id === item.id :
                                                prevItem.isSelected) :
                                            (prevItem.id === item.id ?
                                                !prevItem.isSelected :
                                                prevItem.isSelected)
                                    }))
                                })))}>
                            <p className="dropdown-item-heading">
                                {item.heading}
                            </p>
                            {item.description &&
                                <p className="dropdown-item-description">
                                    {item.description}
                                </p>}
                        </li>)}
                </ul>
            </div>)
    );
};

Dropdown.FlatItems = FlatItems;
Dropdown.GroupItems = GroupItems;

export default Dropdown;