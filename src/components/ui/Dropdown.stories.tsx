import type { Meta, StoryObj } from "@storybook/react";

import type { ContentWithIcon, ContentWithId } from "@/types";
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
        isSelected: false,
        isLoading: false,
    },
} satisfies Meta<typeof Dropdown>;
export default meta;

type Story = StoryObj<typeof meta>;

const dummyItems: (ContentWithId & ContentWithIcon)[] = [
    ...Array.from({ length: 10 }, (_, i) => ({
        id: crypto.randomUUID(),
        heading: `item ${i + 1}`,
        description: Math.random() < 0.5 ?
            undefined :
            `This is a description for item ${i + 1}`,
    }))
];

export const Text: Story = {
    args: {
        triggerItem: 'Text',
        isGroupBy: false,
        selectingInput: 'text',
        items: dummyItems,
    },
};

export const MultiText: Story = {
    args: {
        triggerItem: 'Multi text',
        isGroupBy: false,
        selectingInput: 'multi-text',
        items: dummyItems,
    },
};