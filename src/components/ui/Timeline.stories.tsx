import type { Meta, StoryObj } from '@storybook/react';

import Timeline from './Timeline';

const meta = {
  title: 'Components/Timeline',
  tags: ['autodocs'],
  component: Timeline,
  args: {
    size: 'md',
    items: Array.from({ length: 3 }, (_, i) => ({
      label: new Date(2024, i + 5, 18).toLocaleDateString(),
      content: (
        <p className="text-pretty">
          This is a content for <strong>Item {i + 1}</strong>.
        </p>
      ),
    })),
  },
} satisfies Meta<typeof Timeline>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    alignX: 'center',
  },
};

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    alignY: 'middle',
  },
};
