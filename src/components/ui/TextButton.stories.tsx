import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { FaCheck } from "react-icons/fa6";

import TextButton from "./TextButton";

const meta = {
    title: 'Components/Buttons/TextButton',
    tags: ['autodocs'],
    component: TextButton,
    args: {
        size: 'md',
        spacing: 'default',
        isDisabled: false,
        isSelected: false,
        isLoading: false,
        onClick: fn(),
    },
} satisfies Meta<typeof TextButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Default',
        variant: 'default',
    },
};

export const IconBefore: Story = {
    args: {
        label: 'Icon Before',
        variant: 'default',
        iconBefore: {
            content: FaCheck,
        },
    },
};
export const IconAfter: Story = {
    args: {
        label: 'Icon After',
        variant: 'default',
        iconAfter: {
            content: FaCheck,
        },
    },
};

export const Primary: Story = {
    args: {
        label: 'Primary',
        variant: 'primary',
    },
};

export const Secondary: Story = {
    args: {
        label: 'Secondary',
        variant: 'secondary',
    },
};

export const Warning: Story = {
    args: {
        label: 'Warning',
        variant: 'warning',
    },
};

export const Danger: Story = {
    args: {
        label: 'Danger',
        variant: 'danger',
    },
};