import type { Meta, StoryObj } from "@storybook/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import PageIndicator from "./PageIndicator";

const meta = {
    title: 'Components/PageIndicator',
    tags: ['autodocs'],
    component: PageIndicator,
    args: {
        totalPage: 3,
        defaultSelectedPage: 1,
        size: 'md',
    },
} satisfies Meta<typeof PageIndicator>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        prev: LuChevronLeft,
        next: LuChevronRight,
    },
};

export const TextButton: Story = {
    args: {
        prev: 'Prev',
        next: 'Next',
    },
};