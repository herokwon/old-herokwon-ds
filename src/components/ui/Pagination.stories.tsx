import type { Meta, StoryObj } from "@storybook/react";

import Pagination from "./Pagination";

const meta = {
    title: 'Components/Pagination',
    tags: ['autodocs'],
    component: Pagination,
    args: {
        pagePerIndex: 5,
        defaultSelectedPage: 1,
        size: 'md',
    },
} satisfies Meta<typeof Pagination>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        totalPage: 100,
    },
};

export const DefaultSelectedPage: Story = {
    args: {
        totalPage: 100,
        defaultSelectedPage: 77,
    },
};