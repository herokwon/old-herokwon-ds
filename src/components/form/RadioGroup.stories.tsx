import type { Meta, StoryObj } from "@storybook/react";

import RadioGroup from "./RadioGroup";

const meta = {
    title: 'Components/RadioGroup',
    tags: ['autodocs'],
    component: RadioGroup,
    args: {
        isDisabled: false,
        direction: 'vertical',
        size: 'md',
        items: Array.from({ length: 3 }, (_, i) => ({
            isDisabled: false,
            isSelected: i === 0,
            id: crypto.randomUUID(),
            heading: `Radio Item ${i + 1}`,
            description: Math.random() < 0.5 ?
                undefined :
                `This is a description for Radio Item ${i + 1}`,
            subGroupItem: {
                isDisabled: false,
                direction: 'vertical',
                size: 'md',
                items: Array.from({ length: 2 }, (_, j) => ({
                    isDisabled: false,
                    isSelected: false,
                    id: crypto.randomUUID(),
                    heading: `Radio SubItem ${j + 1}`,

                })),
            },
        })),
    },
} satisfies Meta<typeof RadioGroup>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
    args: {
        direction: 'vertical',
    },
};

export const Horizontal: Story = {
    args: {
        direction: 'horizontal',
    },
};

export const ErrorMessage: Story = {
    args: {
        groupErrorMessage: 'Error!',
        items: meta.args.items.map((dummyItem) => ({
            ...dummyItem,
            isSelected: false,
            subGroupItem: undefined,
        })),
    },
};

export const SubGroupItemErrorMessage: Story = {
    args: {
        items: meta.args.items.map((dummyItem) => ({
            ...dummyItem,
            subGroupItem: {
                ...dummyItem.subGroupItem,
                groupErrorMessage: 'Error!',
            },
        })),
    },
};