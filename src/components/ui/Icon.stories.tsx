import type { Meta, StoryObj } from '@storybook/react';
import { FaCheck } from 'react-icons/fa6';

import Icon from './Icon';

const meta = {
  title: 'Components/Icon',
  tags: ['autodocs'],
  component: Icon,
  args: {
    size: 'md',
    spacing: 'default',
    className:
      'border border-light-secondary dark:border-dark-secondary rounded-full',
  },
} satisfies Meta<typeof Icon>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: FaCheck,
  },
};
