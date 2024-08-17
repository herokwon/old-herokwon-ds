import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import PageIndicator from './PageIndicator';

const meta = {
  title: 'Components/PageIndicator',
  tags: ['autodocs'],
  component: PageIndicator,
  args: {
    totalPage: 3,
    size: 'md',
    shape: 'circle',
    onChangeSelectedIndex: fn(),
  },
} satisfies Meta<typeof PageIndicator>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SquareBorder: Story = {
  args: {
    shape: 'square',
  },
};
