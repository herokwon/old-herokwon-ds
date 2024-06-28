import type { ContentWithIcon, ContentWithId, ItemsWithHeading, SelectingInput } from "..";

export type DropdownFlatItem = ContentWithId & ContentWithIcon;
export type DropdownGroupItem = ItemsWithHeading & {
    selectingInput: SelectingInput;
};
export type DropdownItemList<T extends DropdownFlatItem | DropdownGroupItem> =
    (T extends DropdownGroupItem ?
        {
            items: T[];
            setItems: React.Dispatch<React.SetStateAction<T[]>>;
        } :
        {
            selectingInput: SelectingInput;
            items: T[];
            setItems: React.Dispatch<React.SetStateAction<T[]>>;
        });