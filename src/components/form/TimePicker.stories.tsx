import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import TimePicker from './TimePicker';

const today = new Date();

const meta = {
  title: 'Components/TimePicker',
  tags: ['autodocs'],
  component: TimePicker,
  args: {
    isDisabled: false,
    isLoading: false,
    defaultPickedTimeItem: {
      hour: today.getHours(),
      minute: today.getMinutes(),
    },
    onChangePickedTimeItem: fn(),
  },
} satisfies Meta<typeof TimePicker>;
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
