import type { Meta, StoryObj } from '@storybook/react';

import Empty from './Empty';

const meta = {
  title: 'Components/Empty',
  tags: ['autodocs'],
  component: Empty,
} satisfies Meta<typeof Empty>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Custom: Story = {
  args: {
    className: 'w-300 aspect-[2123/1335]',
    imgData: {
      src: 'https://images.unsplash.com/photo-1496262967815-132206202600?q=80&w=2123&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      unoptimized: true,
    },
  },
};
