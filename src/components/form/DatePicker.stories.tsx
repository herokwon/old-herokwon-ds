import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import DatePicker from './DatePicker';

const meta = {
  title: 'Components/DatePicker',
  tags: ['autodocs'],
  component: DatePicker,
  args: {
    defaultPickedDateItem: {
      year: new Date().getFullYear(),
      month: 1,
      date: 1,
    },
    onChangePickedDateItem: fn(),
  },
} satisfies Meta<typeof DatePicker>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

<DatePicker />;
