import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import type { DropdownFlatItem, DropdownGroupItem } from "@/types";
import Dropdown from "./Dropdown";

const meta = {
    title: 'Components/Dropdown',
    tags: ['autodocs'],
    component: Dropdown,
    args: {
        size: 'md',
        position: 'bottom-center',
        triggerEvent: 'click',
        isDisabled: false,
        isLoading: false,
    },
} satisfies Meta<typeof Dropdown>;
export default meta;

type Story = StoryObj<typeof Dropdown>;

const DropdownRender = {
    flatItems: ({ ...props }: React.ComponentProps<typeof Dropdown> & Pick<DropdownGroupItem, 'selectingInput'>) => {
        const [isOpen, setIsOpen] = useState<boolean>(false);
        const [items, setItems] = useState<DropdownFlatItem[]>([
            ...Array.from({ length: 10 }, (_, i) => ({
                id: crypto.randomUUID(),
                heading: `item ${i + 1}`,
                description: i < 5 ?
                    undefined :
                    `This is a description for item ${i + 1}`,
            })),
        ]);

        return (
            <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
                <Dropdown.FlatItems
                    selectingInput={props.selectingInput}
                    isOpen={isOpen}
                    items={items}
                    setIsOpen={setIsOpen}
                    setItems={setItems} />
            </Dropdown>
        );
    },
    groupItems: ({ ...props }: React.ComponentProps<typeof Dropdown> & Partial<Pick<DropdownGroupItem, 'selectingInput'>>) => {
        const [isOpen, setIsOpen] = useState<boolean>(false);
        const [items, setItems] = useState<DropdownGroupItem[]>([
            ...Array.from({ length: 5 }, (_, i) => ({
                id: crypto.randomUUID(),
                heading: `item ${i + 1}`,
                selectingInput: props.selectingInput ?? 'text',
                items: [
                    ...Array.from({ length: 3 }, (_, j) => ({
                        id: crypto.randomUUID(),
                        heading: `item ${j + 1}`,
                        description: j < 1 ?
                            undefined :
                            `This is a description for item ${i + 1} in Group ${i + 1}`,
                    })),
                ],
            })),
        ]);

        return (
            <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
                <Dropdown.GroupItems
                    isOpen={isOpen}
                    items={items}
                    setIsOpen={setIsOpen}
                    setItems={setItems} />
            </Dropdown>
        );
    },
};

export const Text: Story = {
    args: {
        triggerItem: 'Text',
    },
    render: ({ ...props }) =>
        <DropdownRender.flatItems {...props} selectingInput='text' />,
};

export const MultiText: Story = {
    args: {
        triggerItem: 'Multi text',
    },
    render: ({ ...props }) =>
        <DropdownRender.flatItems {...props} selectingInput='multi-text' />,
};