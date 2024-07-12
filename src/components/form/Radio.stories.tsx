import type { Meta, StoryObj } from '@storybook/react';

import Radio from './Radio';

const meta = {
  title: 'Components/Radio',
  tags: ['autodocs'],
  component: Radio,
  args: {
    isDisabled: false,
    isSelected: false,
    id: crypto.randomUUID(),
    size: 'md',
    description: 'This is a description for Radio Item',
  },
} satisfies Meta<typeof Radio>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: 'Default Radio Item',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    heading: 'Disabled Radio Item',
  },
};
