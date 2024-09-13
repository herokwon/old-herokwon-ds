import type { Meta, StoryObj } from '@storybook/react';
import { FaCheck } from 'react-icons/fa6';

import { ELEMENT_EXTENDED_SIZES } from '../../data/constants';

import Icon from './Icon';

const meta = {
  title: 'Components/Icon',
  tags: ['autodocs'],
  component: Icon,
  args: {
    icon: FaCheck,
    size: 'md',
    spacing: 'default',
    className:
      'border border-light-secondary dark:border-dark-secondary rounded-full',
  },
} satisfies Meta<typeof Icon>;
export default meta;

type Story = StoryObj<typeof meta>;

export const SelectOptions: Story = {
  argTypes: {
    size: {
      control: 'select',
      options: [...ELEMENT_EXTENDED_SIZES],
    },
  },
};

export const InputNumberOptions: Story = {
  argTypes: {
    size: {
      control: 'number',
    },
  },
};
