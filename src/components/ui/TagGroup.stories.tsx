import type { Meta, StoryObj } from '@storybook/react';

import Tag from './Tag';
import TagGroup from './TagGroup';

const meta = {
  title: 'Components/TagGroup',
  tags: ['autodocs'],
  component: TagGroup,
  args: {
    children: Array.from({ length: 7 }, (_, i) => (
      <Tag key={i} label={`Tag ${i + 1}`} isRemovable />
    )),
    alignment: 'left',
    className: 'w-[600px] border p-2',
  },
} satisfies Meta<typeof TagGroup>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Left: Story = {};

export const Center: Story = {
  args: {
    alignment: 'center',
  },
};

export const Right: Story = {
  args: {
    alignment: 'right',
  },
};
