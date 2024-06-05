import { useMemo, useState } from "react";
import { LuX } from "react-icons/lu";

import type { ContentWithId, InputProps, SelectingInput } from "@/types";
import Dropdown from "../ui/Dropdown";
import TextField from "./TextField";
import IconButton from "../ui/IconButton";

interface SelectProps extends InputProps {
    selectingInput: SelectingInput;
    items: ContentWithId[];
    setItems: React.Dispatch<React.SetStateAction<SelectProps['items']>>;
};

export default function Select({ selectingInput, items, setItems, ...props }: SelectProps) {
    const { isDisabled = false, label, helperMessage, errorMessage, ...restProps } = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const selectedItems = useMemo(() =>
        items.filter((item) =>
            item.isSelected).map((item) =>
                item.heading), [items]);

    return (
        <Dropdown
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            className='last:*:min-w-full'
            triggerItem={
                <div className="relative">
                    <TextField
                        {...restProps}
                        readOnly
                        value={selectedItems}
                        className='px-3' />
                    {selectedItems.length > 0 &&
                        <IconButton
                            icon={LuX}
                            spacing='compact'
                            className='mx-0.5 absolute top-1/2 right-0 -translate-y-1/2 z-[1]'
                            onClick={() => setItems((prevItems) =>
                                prevItems.map((prevItem) => ({
                                    ...prevItem,
                                    isSelected: false,
                                }))
                            )} />}
                </div>}>
            <Dropdown.FlatItems
                selectingInput={selectingInput}
                isOpen={isOpen}
                items={items}
                setIsOpen={setIsOpen}
                setItems={setItems} />
        </Dropdown>
    );
}