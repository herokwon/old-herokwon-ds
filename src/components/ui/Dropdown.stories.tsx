import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import type { DropdownFlatItem, DropdownGroupItem } from "../../types";
import Dropdown from "./Dropdown";

const meta = {
    title: 'Components/Dropdown',
    tags: ['autodocs'],
    component: Dropdown,
    args: {
        children: [],
        size: 'md',
        position: 'bottom-center',
        triggerEvent: 'click',
        isDisabled: false,
        isLoading: false,
        isOpen: false,
    },
} satisfies Meta<typeof Dropdown>;
export default meta;

type Story = StoryObj<typeof Dropdown>;

const DropdownRender = {
    empty: ({ selectingInput, ...props }: Omit<React.ComponentProps<typeof Dropdown>, 'children' | 'setIsOpen'> & Pick<DropdownGroupItem, 'selectingInput'>) => {
        const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
        const [items, setItems] = useState<DropdownFlatItem[]>([]);

        useEffect(() => {
            setIsOpen(props.isOpen);
        }, [props.isOpen]);

        return (
            <Dropdown
                {...props}
                isOpen={isOpen}
                setIsOpen={setIsOpen}>
                <Dropdown.FlatItems
                    selectingInput={selectingInput}
                    items={items}
                    setItems={setItems} />
            </Dropdown>
        );
    },
    flatItems: ({ selectingInput, ...props }: Omit<React.ComponentProps<typeof Dropdown>, 'children' | 'setIsOpen'> & Pick<DropdownGroupItem, 'selectingInput'>) => {
        const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
        const [items, setItems] = useState<DropdownFlatItem[]>([
            ...Array.from({ length: 10 }, (_, i) => ({
                id: crypto.randomUUID(),
                heading: `item ${i + 1}`,
                description: i < 5 ?
                    undefined :
                    `This is a description for item ${i + 1}`,
            })),
        ]);

        useEffect(() => {
            setIsOpen(props.isOpen);
        }, [props.isOpen]);

        return (
            <Dropdown
                {...props}
                isOpen={isOpen}
                setIsOpen={setIsOpen}>
                <Dropdown.FlatItems
                    selectingInput={selectingInput}
                    items={items}
                    setItems={setItems} />
            </Dropdown>
        );
    },
    groupItems: ({ selectingInput, ...props }: Omit<React.ComponentProps<typeof Dropdown>, 'children' | 'setIsOpen'> & Pick<DropdownGroupItem, 'selectingInput'>) => {
        const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
        const [items, setItems] = useState<DropdownGroupItem[]>([
            ...Array.from({ length: 5 }, (_, i) => ({
                id: crypto.randomUUID(),
                heading: `group ${i + 1}`,
                selectingInput: selectingInput,
                items: [
                    ...Array.from({ length: 3 }, (_, j) => ({
                        id: crypto.randomUUID(),
                        heading: `item ${j + 1}`,
                        description: j < 1 ?
                            undefined :
                            `This is a description for item ${j + 1} in Group ${i + 1}`,
                    })),
                ],
            })),
        ]);

        useEffect(() => {
            setIsOpen(props.isOpen);
        }, [props.isOpen]);

        return (
            <Dropdown
                {...props}
                isOpen={isOpen}
                setIsOpen={setIsOpen}>
                <Dropdown.GroupItems
                    items={items}
                    setItems={setItems} />
            </Dropdown>
        );
    },
};

export const Empty: Story = {
    args: {
        triggerItem: 'Empty',
    },
    render: ({ ...props }) =>
        <DropdownRender.empty {...props} selectingInput='text' />
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

export const Radio: Story = {
    args: {
        triggerItem: 'Radio',
    },
    render: ({ ...props }) =>
        <DropdownRender.groupItems {...props} selectingInput='radio' />,
};

export const Checkbox: Story = {
    args: {
        triggerItem: 'Checkbox',
    },
    render: ({ ...props }) =>
        <DropdownRender.groupItems {...props} selectingInput='checkbox' />,
};