import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import SectionMessage from "./SectionMessage";

const meta = {
    title: 'Components/SectionMessage',
    tags: ['autodocs'],
    component: SectionMessage,
    args: {
        isHidable: false,
        variant: 'default',
        size: 'md',
        actions: [],
    },
} satisfies Meta<typeof SectionMessage>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        message: 'This is a default section message',
    },
};

export const Hidable: Story = {
    args: {
        isHidable: true,
        defaultHidden: false,
        heading: 'Heading',
        message: 'This is a hidable section message with heading',
    },
};

export const Actions: Story = {
    args: {
        heading: 'Heading',
        message: 'This is a section message with actions',
        actions: Array.from({ length: 2 }, (_, i) => ({
            isDisabled: false,
            id: crypto.randomUUID(),
            label: `action ${i + 1}`,
            variant: i === 0 ?
                'primary' :
                'default',
            onClick: fn(),
        })),
    },
};

export const Success: Story = {
    args: {
        message: 'This is a success section message',
        variant: 'success',
    },
};

export const Info: Story = {
    args: {
        message: 'This is an info section message',
        variant: 'info',
    },
};

export const Warning: Story = {
    args: {
        message: 'This is a warning section message',
        variant: 'warning',
    },
};

export const Danger: Story = {
    args: {
        message: 'This is a danger section message',
        variant: 'danger',
    },
};