import type { Meta, StoryObj } from '@storybook/react';

import { ELEMENT_EXTENDED_SIZES } from '../../data/constants';

import Dots from './Dots';

const meta = {
  title: 'Components/Dots',
  tags: ['autodocs'],
  component: Dots,
  args: {
    size: 'md',
    length: 3,
  },
} satisfies Meta<typeof Dots>;
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
