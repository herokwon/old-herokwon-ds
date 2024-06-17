import type { Meta, StoryObj } from "@storybook/react";
import { FaCheck, FaX } from "react-icons/fa6";

import Toggle from "./Toggle";

const meta = {
    title: 'Components/Toggle',
    tags: ['autodocs'],
    component: Toggle,
    args: {
        isDisabled: false,
        isSelected: false,
        size: 'md',
    },
} satisfies Meta<typeof Toggle>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Icon: Story = {
    args: {
        activeIcon: FaCheck,
        inactiveIcon: FaX,
    },
};