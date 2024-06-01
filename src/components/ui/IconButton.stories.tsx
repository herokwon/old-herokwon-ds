import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { LuMousePointer2 } from "react-icons/lu";

import IconButton from "./IconButton";

const meta = {
    title: 'Components/Buttons/IconButton',
    tags: ['autodocs'],
    component: IconButton,
    args: {
        icon: LuMousePointer2,
        size: 'md',
        spacing: 'default',
        shape: 'circle',
        isDisabled: false,
        isSelected: false,
        isLoading: false,
        onClick: fn(),
    },
} satisfies Meta<typeof IconButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: 'default',
    },
};

export const Primary: Story = {
    args: {
        variant: 'primary',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
    },
};