import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import type { TimeItem } from '../../types';
import TimePicker from './TimePicker';

const meta = {
  title: 'Components/TimePicker',
  tags: ['autodocs'],
  component: TimePicker,
  args: {
    isDisabled: false,
    isLoading: false,
  },
} satisfies Meta<typeof TimePicker>;
export default meta;

type Story = StoryObj<typeof TimePicker>;

const TimePickerRender = ({
  ...props
}: Omit<
  React.ComponentProps<typeof TimePicker>,
  'pickedTime' | 'setPickedTime'
>) => {
  const now = new Date();
  const [pickedTime, setPickedTime] = useState<TimeItem>({
    hour: now.getHours(),
    minute: now.getMinutes(),
  });

  return (
    <TimePicker
      {...props}
      pickedTime={pickedTime}
      setPickedTime={setPickedTime}
    />
  );
};

export const Default: Story = {
  render: ({ ...props }) => <TimePickerRender {...props} />,
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: ({ ...props }) => <TimePickerRender {...props} />,
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  render: ({ ...props }) => <TimePickerRender {...props} />,
};
