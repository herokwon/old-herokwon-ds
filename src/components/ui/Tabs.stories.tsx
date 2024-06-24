import type { Meta, StoryObj } from "@storybook/react";

import Tabs from "./Tabs";

const meta = {
    title: 'Components/Tabs',
    tags: ['autodocs'],
    component: Tabs,
    args: {
        alignX: 'left',
        className: 'min-w-[300px]',
        tabItems: Array.from({ length: 3 }, (_, i) => ({
            id: crypto.randomUUID(),
            tabName: `Tab ${i + 1}`,
            tabContent: (
                <div className="w-full">
                    <p className="w-full">
                        {`This is content for Tab ${i + 1}.`}
                    </p>
                </div>
            ),
        })),
    },
} satisfies Meta<typeof Tabs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AlignCenter: Story = {
    args: {
        alignX: 'center',
    },
};

export const AlignRight: Story = {
    args: {
        alignX: 'right',
    },
};