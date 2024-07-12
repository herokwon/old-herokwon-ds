import type { Meta, StoryObj } from '@storybook/react';

import Spinner from './Spinner';

const meta = {
  title: 'Components/Spinner',
  tags: ['autodocs'],
  component: Spinner,
  args: {
    size: 'md',
  },
} satisfies Meta<typeof Spinner>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
