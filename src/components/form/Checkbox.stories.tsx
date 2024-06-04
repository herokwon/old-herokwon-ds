import type { Meta, StoryObj } from "@storybook/react";

import Checkbox from "./Checkbox";

const meta = {
    title: 'Components/Checkbox',
    tags: ['autodocs'],
    component: Checkbox,
    args: {
        id: crypto.randomUUID(),
    },
} satisfies Meta<typeof Checkbox>;
export default meta;

type Story = StoryObj<typeof meta>;

const dummySubItems: React.ComponentProps<typeof Checkbox>['subItems'] = [
    ...Array.from({ length: 3 }, (_, i) => ({
        id: crypto.randomUUID(),
        heading: `Checkbox SubItem ${i + 1}`,
    }))
];

export const Default: Story = {
    args: {
        heading: 'Default Checkbox Item',
    },
};

export const Disabled: Story = {
    args: {
        isDisabled: true,
        heading: 'Disabled Checkbox Item',
    },
};

export const ErrorMessage: Story = {
    args: {
        heading: 'Error Checkbox Item',
        errorMessage: 'Error!',
    },
};

export const SubItems: Story = {
    args: {
        heading: 'Checkbox Item',
        subItems: dummySubItems,
    },
};

export const DependentSubItems: Story = {
    args: {
        heading: 'Checkbox Item',
        isDependent: true,
        subItems: dummySubItems,
    },
};