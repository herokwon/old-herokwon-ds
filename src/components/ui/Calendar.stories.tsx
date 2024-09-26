import type { Meta, StoryObj } from '@storybook/react';

import Calendar from './Calendar';

const meta = {
  title: 'Components/Calendar',
  tags: ['autodocs'],
  component: Calendar,
  args: {
    className: 'last:*:rounded-ms',
    defaultPickedDate: {
      year: new Date().getFullYear(),
      month: 1,
      date: 1,
    },
  },
} satisfies Meta<typeof Calendar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Monthly: Story = {
  args: {
    variant: 'monthly',
  },
};

export const Yearly: Story = {
  args: {
    variant: 'yearly',
  },
};
