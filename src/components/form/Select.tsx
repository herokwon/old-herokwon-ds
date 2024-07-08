import { useMemo, useState } from "react";
import { LuX } from "react-icons/lu";

import type { ContentWithId, InputProps, SelectingInput } from "../../types";
import Dropdown from "../ui/Dropdown";
import TextField from "./TextField";
import IconButton from "../ui/IconButton";
import Tag from "../ui/Tag";

interface SelectProps extends InputProps {
    selectingInput: SelectingInput;
    items: ContentWithId[];
    setItems: React.Dispatch<React.SetStateAction<ContentWithId[]>>;
};

export default function Select({ selectingInput, items, setItems, ...props }: SelectProps) {
    const { isDisabled = false, label, helperMessage, errorMessage, ...restProps } = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const selectedItems = useMemo(() =>
        items.filter((item) =>
            item.isSelected), [items]);

    return (
        <Dropdown
            isDisabled={isDisabled}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            className='w-full last:*:min-w-full'
            triggerItem={
                <TextField
                    {...restProps}
                    readOnly
                    autoFocus={isOpen}
                    hidden={selectedItems.length > 0}
                    placeholder={selectedItems.length > 0 ?
                        '' :
                        restProps.placeholder}
                    className='px-3'>
                    {selectedItems.length > 0 &&
                        <div className="w-full py-[0.3125rem] flex items-center">
                            <div className="w-full px-2 flex flex-wrap gap-1">
                                {selectedItems.map((selectedItem) =>
                                    <Tag
                                        key={selectedItem.id}
                                        label={selectedItem.heading}
                                        isRemovable={selectingInput === 'multi-text' || selectingInput === 'checkbox'}
                                        iconAfter={{
                                            onClick: () => setItems((prevItems) =>
                                                prevItems.map((prevItem) => ({
                                                    ...prevItem,
                                                    isSelected: (prevItem.id === selectedItem.id) ?
                                                        false :
                                                        prevItem.isSelected,
                                                })))
                                        }} />)}
                            </div>
                            {selectedItems.length > 0 &&
                                <IconButton
                                    icon={LuX}
                                    spacing='compact'
                                    className='mx-0.5'
                                    onClick={() => setItems((prevItems) =>
                                        prevItems.map((prevItem) => ({
                                            ...prevItem,
                                            isSelected: false,
                                        }))
                                    )} />}
                        </div>}
                </TextField>}>
            <Dropdown.FlatItems
                selectingInput={selectingInput}
                isOpen={isOpen}
                items={items}
                setIsOpen={setIsOpen}
                setItems={setItems} />
        </Dropdown>
    );
}