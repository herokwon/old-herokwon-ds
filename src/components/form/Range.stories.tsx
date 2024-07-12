import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Range from './Range';

const meta = {
  title: 'Components/Range',
  tags: ['autodocs'],
  component: Range,
  args: {
    isShowingLabel: false,
    labelDirection: 'left',
    min: 0,
    max: 100,
    step: 1,
  },
} satisfies Meta<typeof Range>;
export default meta;

type Story = StoryObj<typeof Range>;

const RangeRender = ({
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof Range>,
  'selectedValue' | 'setSelectedValue'
>) => {
  const [selectedValue, setSelectedValue] = useState<number>(0);

  return (
    <Range
      {...props}
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
    />
  );
};

export const Default: Story = {
  render: ({ ...props }) => <RangeRender {...props} />,
};

export const ShowingLabel: Story = {
  args: {
    isShowingLabel: true,
  },
  render: ({ ...props }) => <RangeRender {...props} />,
};

export const HelperMessage: Story = {
  args: {
    helperMessage: 'This is a helper message',
  },
  render: ({ ...props }) => <RangeRender {...props} />,
};

export const ErrorMessage: Story = {
  args: {
    errorMessage: 'Error!',
  },
  render: ({ ...props }) => <RangeRender {...props} />,
};
