import type { Meta, StoryObj } from '@storybook/react';

import { MONTHS } from '../../data/constant';

import Calendar from './Calendar';

const today = new Date();

const meta = {
  title: 'Components/Calendar',
  tags: ['autodocs'],
  component: Calendar,
  args: {
    className: 'last:*:rounded-ms',
    defaultPickedDateItem: {
      year: today.getFullYear(),
      month: MONTHS[today.getMonth()],
      date: today.getDate(),
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
