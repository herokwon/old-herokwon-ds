import type { Meta, StoryObj } from "@storybook/react";

import InlineMessage from "./InlineMessage";

const meta = {
    title: 'Components/InlineMessage',
    tags: ['autodocs'],
    component: InlineMessage,
    args: {
        variant: 'default',
        size: 'md',
    },
} satisfies Meta<typeof InlineMessage>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        message: 'This is a default message',
    },
};

export const Heading: Story = {
    args: {
        heading: 'Heading',
        message: 'This is a default message with heading',
    },
};

export const Success: Story = {
    args: {
        variant: 'success',
        message: 'This is a success message',
    },
};

export const Info: Story = {
    args: {
        variant: 'info',
        message: 'This is a info message',
    },
};

export const Warning: Story = {
    args: {
        variant: 'warning',
        message: 'This is a warning message',
    },
};

export const Danger: Story = {
    args: {
        variant: 'danger',
        message: 'This is a danger message',
    },
};