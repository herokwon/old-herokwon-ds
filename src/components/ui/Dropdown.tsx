import { useEffect, useMemo, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

import type { AbsolutePosition, DropdownFlatItem, DropdownGroupItem, DropdownItemList, ElementBaseSize, ElementStates } from "@/types";
import TextButton from "./TextButton";

interface DropdownBaseProps extends ElementStates, React.ComponentPropsWithoutRef<'div'> {
    size?: ElementBaseSize;
    position?: AbsolutePosition;
    triggerEvent?: Extract<keyof HTMLElementEventMap, 'click' | 'mouseenter'>;
    triggerItem?: string | React.ReactElement;
    emptyMessage?: string;
};

type DropdownSelectingProps = ({
    isGroupBy?: false;
} & DropdownItemList<DropdownFlatItem>) | {
    isGroupBy: true;
} & DropdownItemList<DropdownGroupItem>;

type DropdownProps = DropdownBaseProps & DropdownSelectingProps;
type DropdownItemsProps<T extends DropdownFlatItem | DropdownGroupItem> = DropdownItemList<T> & {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EMPTY_MESSAGE = '선택 가능한 데이터가 없습니다.';

export default function Dropdown({ size = 'md', position = 'bottom-center', triggerEvent = 'click', triggerItem, emptyMessage = EMPTY_MESSAGE, ...props }: DropdownProps) {
    const { isDisabled = false, isSelected = false, isLoading = false, ...rest } = props;

    const [isOpen, setIsOpen] = useState<boolean>(isSelected);
    const [maxHeight, setMaxHeight] = useState<number>(0);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const updateContainerMaxHeight = () => {
        const dropdownItemsContainer = dropdownRef.current?.lastElementChild;
        if (!dropdownItemsContainer) {
            setMaxHeight(0);
            return;
        }

        const containerTop = dropdownItemsContainer.getBoundingClientRect().top;
        setMaxHeight(document.documentElement.scrollHeight - containerTop - 16);
    };

    useEffect(() => {
        setIsOpen(isSelected);
    }, [isSelected]);

    useEffect(() => {
        if (!isOpen) return;

        const handleClick = (e: Event) => {
            isOpen && !dropdownRef.current?.contains(e.target as Node | null) && setIsOpen(false);
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
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
                    {rest.items.length === 0 ?
                        <p className="text-center">
                            {emptyMessage}
                        </p> :
                        rest.isGroupBy ?
                            <GroupItems
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                items={rest.items} /> :
                            <FlatItems
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                selectingInput={rest.selectingInput}
                                items={rest.items} />}
                </div>
            </div>
        </div>
    );
}

const FlatItems = ({ isOpen, setIsOpen, selectingInput, items }: DropdownItemsProps<DropdownFlatItem>) => {
    const [flatItems, setFlatItems] = useState<DropdownFlatItem[]>((selectingInput === 'multi-text' || selectingInput === 'checkbox') ?
        items :
        items.map((item, index) => ({
            ...item,
            isSelected: items.findIndex((item) => item.isSelected) === index,
        })));

    useEffect(() => {
        if (!isOpen) return;

        switch (selectingInput) {
            case 'text': case 'radio':
                setIsOpen(false);
                break;
            case 'multi-text': case 'checkbox':
                !flatItems.find((flatItem) => flatItem.isSelected) &&
                    setIsOpen(false);
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectingInput, flatItems]);

    return (
        <ul className="dropdown-items-list--flat">
            {flatItems.map((flatItem) =>
                <li
                    key={flatItem.id}
                    className={`dropdown-item ${flatItem.isDisabled ?
                        'disabled' :
                        flatItem.isSelected ?
                            'selected' :
                            ''}`}
                    onClick={() => setFlatItems((prevFlatItems) =>
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

const GroupItems = ({ isOpen, setIsOpen, items }: DropdownItemsProps<DropdownGroupItem>) => {
    const [groupItems, setGroupItems] = useState<DropdownGroupItem[]>(items.map((groupItem) =>
        (groupItem.selectingInput === 'multi-text' || groupItem.selectingInput === 'checkbox') ?
            groupItem :
            ({
                ...groupItem,
                items: groupItem.items.map((item, index) => ({
                    ...item,
                    isSelected: groupItem.items.findIndex((item) => item.isSelected) === index
                }))
            })));
    const inputsOfGroupItems = useMemo(() =>
        Array.from(new Set(groupItems.map((groupItem) => groupItem.selectingInput))), [groupItems]);
    const isNotSelected = useMemo(() =>
        groupItems.reduce((acc, groupItem) =>
            acc && groupItem.items.filter((item) =>
                item.isSelected).length === 0, true), [groupItems]);

    useEffect(() => {
        if (!isOpen) return;
        ((inputsOfGroupItems.length === 1 && inputsOfGroupItems[0] === 'text') || isNotSelected) && setIsOpen(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [groupItems]);

    return (
        groupItems.map((groupItem) =>
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
                            onClick={() => setGroupItems((prevGroupItems) =>
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