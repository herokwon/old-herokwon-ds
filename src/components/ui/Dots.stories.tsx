import type { Meta, StoryObj } from '@storybook/react';

import { ICON_SIZE } from '../../data/constant';

import Dots from './Dots';

const meta = {
  title: 'Components/Dots',
  tags: ['autodocs'],
  component: Dots,
  args: {
    size: 'md',
  },
} satisfies Meta<typeof Dots>;
export default meta;

type Story = StoryObj<typeof meta>;

export const SelectOptions: Story = {
  argTypes: {
    size: {
      control: 'select',
      options: [...Object.keys(ICON_SIZE)],
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
