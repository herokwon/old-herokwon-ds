import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { LuMousePointer2 } from 'react-icons/lu';

import IconButton from './IconButton';

const meta = {
  title: 'Components/Buttons/IconButton',
  tags: ['autodocs'],
  component: IconButton,
  args: {
    isDisabled: false,
    isSelected: false,
    isLoading: false,
    icon: LuMousePointer2,
    size: 'md',
    spacing: 'default',
    shape: 'circle',
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

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
