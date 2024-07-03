import type { Meta, StoryObj } from "@storybook/react";

import Badge from "./Badge";

const meta = {
    title: 'Components/Badge',
    tags: ['autodocs'],
    component: Badge,
    args: {
        value: 100,
        size: 'md',
        shape: 'round',
        maxValue: undefined,
    },
} satisfies Meta<typeof Badge>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: 'default',
        maxValue: 100,
    },
};

export const MaxValue: Story = {
    args: {
        variant: 'default',
        maxValue: 99,
    },
};

export const Primary: Story = {
    args: {
        variant: 'primary',
        maxValue: 100,
    },
};

export const Added: Story = {
    args: {
        variant: 'added',
    },
};

export const Removed: Story = {
    args: {
        variant: 'removed',
    },
};