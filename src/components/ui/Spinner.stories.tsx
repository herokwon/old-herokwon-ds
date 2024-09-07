import type { Meta, StoryObj } from '@storybook/react';

import { ELEMENT_EXTENDED_SIZES } from '../../data/constants';

import Spinner from './Spinner';

const meta = {
  title: 'Components/Spinner',
  tags: ['autodocs'],
  component: Spinner,
  args: {
    size: 'md',
  },
} satisfies Meta<typeof Spinner>;
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
