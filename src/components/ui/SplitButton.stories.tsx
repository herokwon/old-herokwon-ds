import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import SplitButton from "./SplitButton";

const dummyItems: React.ComponentProps<typeof SplitButton>['items'] = [
    ...Array.from({ length: 3 }, (_, i) => ({
        id: crypto.randomUUID(),
        heading: `Item ${i + 1}`,
        description: `This is optional description for item ${i + 1}.`,
        isDisabled: i === 2,
        isSelected: false,
        onClick: fn(),
    }))];

const meta = {
    title: 'Components/Buttons/SplitButton',
    tags: ['autodocs'],
    component: SplitButton,
    args: {
        defaultLabel: 'Default label',
        size: 'md',
        spacing: 'default',
        items: [...dummyItems],
        isDisabled: false,
        isSelected: false,
        isLoading: false,
    },
} satisfies Meta<typeof SplitButton>;
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

export const Disabled: Story = {
    args: {
        isDisabled: true,
    },
};