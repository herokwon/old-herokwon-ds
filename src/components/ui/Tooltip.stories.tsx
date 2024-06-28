import type { Meta, StoryObj } from "@storybook/react";

import Tooltip from "./Tooltip";
import TextButton from "./TextButton";

const meta = {
    title: 'Components/Tooltip',
    tags: ['autodocs'],
    component: Tooltip,
    args: {
        isDisabled: false,
        isLoading: false,
        position: 'bottom-center',
        size: 'md',
    },
} satisfies Meta<typeof Tooltip>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Click: Story = {
    args: {
        triggerEvent: 'click',
        triggerItem: <TextButton label='Click on Button' />,
        content: 'This is a click tooltip',
    },
};

export const Hover: Story = {
    args: {
        triggerEvent: 'mouseenter',
        triggerItem: <TextButton label='Hover on Button' />,
        content: 'This is a hover tooltip',
    },
};