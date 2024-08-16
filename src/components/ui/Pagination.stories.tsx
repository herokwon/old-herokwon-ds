import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Pagination from './Pagination';

const meta = {
  title: 'Components/Pagination',
  tags: ['autodocs'],
  component: Pagination,
  args: {
    totalPage: 100,
    pagePerIndex: 5,
    size: 'md',
    shape: 'square',
    onChangeSelectedPage: fn(),
  },
} satisfies Meta<typeof Pagination>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Circle: Story = {
  args: {
    shape: 'circle',
  },
};
