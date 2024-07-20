import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import SplitButton from './SplitButton';

const meta = {
  title: 'Components/Buttons/SplitButton',
  tags: ['autodocs'],
  component: SplitButton,
  args: {
    isDisabled: false,
    isSelected: false,
    isLoading: false,
    defaultLabel: 'Default label',
    variant: 'default',
    size: 'md',
    spacing: 'default',
    items: Array.from({ length: 3 }, (_, i) => ({
      isDisabled: i === 2,
      children: `Split Button Item ${i + 1}`,
      id: crypto.randomUUID(),
      description: `This is a description for Split Button Item ${i + 1}`,
      onClick: fn(),
    })),
  },
} satisfies Meta<typeof SplitButton>;
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
