import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Range from './Range';

const meta = {
  title: 'Components/Range',
  tags: ['autodocs'],
  component: Range,
  args: {
    isDisabled: false,
    isShowingLabel: false,
    labelDirection: 'left',
    min: 0,
    max: 100,
    step: 1,
    onChangeValue: fn(),
  },
} satisfies Meta<typeof Range>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ShowingLabel: Story = {
  args: {
    isShowingLabel: true,
  },
};

export const HelperMessage: Story = {
  args: {
    helperMessage: 'This is a helper message',
  },
};

export const ErrorMessage: Story = {
  args: {
    errorMessage: 'Error!',
  },
};
