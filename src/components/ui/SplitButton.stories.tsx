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
    stopPropagation: false,
    preventDefault: false,
    variant: 'default',
    size: 'md',
    spacing: 'default',
    defaultLabel: 'Default label',
    items: Array.from({ length: 3 }, (_, i) => ({
      isDisabled: i === 2,
      id: crypto.randomUUID(),
      label: `Split Button Item ${i + 1}`,
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
