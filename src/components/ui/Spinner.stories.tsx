import type { Meta, StoryObj } from '@storybook/react';

import { ICON_SIZE } from '../../data/constant';

import Spinner from './Spinner';

const meta = {
  title: 'Components/Spinner',
  tags: ['autodocs'],
  component: Spinner,
  args: {
    size: 'md',
  },
  argTypes: {
    size: {
      control: 'select',
      options: [...Object.keys(ICON_SIZE)],
    },
  },
} satisfies Meta<typeof Spinner>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
