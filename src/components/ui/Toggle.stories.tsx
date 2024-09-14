import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { FaCheck, FaXmark } from 'react-icons/fa6';

import Toggle from './Toggle';

const meta = {
  title: 'Components/Toggle',
  tags: ['autodocs'],
  component: Toggle,
  args: {
    stopPropagation: false,
    preventDefault: false,
    isDisabled: false,
    defaultActive: false,
    size: 'md',
    onChange: fn(),
  },
} satisfies Meta<typeof Toggle>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Icon: Story = {
  args: {
    activeIcon: FaCheck,
    inactiveIcon: FaXmark,
  },
};
