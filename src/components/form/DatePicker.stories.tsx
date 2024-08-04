import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { getDateItem } from '../../utils';

import type { DateItem } from '../../types';
import DatePicker from './DatePicker';

const meta = {
  title: 'Components/DatePicker',
  tags: ['autodocs'],
  component: DatePicker,
} satisfies Meta<typeof DatePicker>;
export default meta;

type Story = StoryObj<typeof DatePicker>;

const DatePickerRender = ({
  ...props
}: Omit<
  React.ComponentProps<typeof DatePicker>,
  'today' | 'pickeddate' | 'setPickedDate'
>) => {
  const today = getDateItem(new Date());
  const [pickedDate, setPickedDate] = useState<DateItem>(today);

  return (
    <DatePicker
      {...props}
      today={today}
      pickedDate={pickedDate}
      setPickedDate={setPickedDate}
    />
  );
};

export const Default: Story = {
  render: ({ ...props }) => <DatePickerRender {...props} />,
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: ({ ...props }) => <DatePickerRender {...props} />,
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  render: ({ ...props }) => <DatePickerRender {...props} />,
};
