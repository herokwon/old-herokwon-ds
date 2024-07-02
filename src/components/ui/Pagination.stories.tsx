import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Pagination from "./Pagination";

type PaginationRenderProps = {
    defaultSelectedPage?: number;
} & React.ComponentPropsWithoutRef<typeof Pagination>;

const meta = {
    title: 'Components/Pagination',
    tags: ['autodocs'],
    component: Pagination,
    args: {
        pagePerIndex: 5,
        size: 'md',
    },
} satisfies Meta<typeof Pagination>;
export default meta;

type Story = StoryObj<typeof Pagination>;

const PaginationRender = ({ defaultSelectedPage, ...props }: PaginationRenderProps) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(defaultSelectedPage ?? 0);

    return (
        <Pagination
            {...props}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex} />
    );
};

export const Default: Story = {
    args: {
        totalPage: 100,
    },
    render: ({ ...props }) =>
        <PaginationRender {...props} />,
};

export const DefaultSelectedPage: Story = {
    args: {
        totalPage: 100,
    },
    render: ({ ...props }) =>
        <PaginationRender {...props} defaultSelectedPage={77} />,
};