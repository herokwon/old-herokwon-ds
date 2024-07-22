import type { Meta, StoryObj } from '@storybook/react';
import { FaCheck } from 'react-icons/fa6';
import { LuX } from 'react-icons/lu';

import ButtonGroup from './ButtonGroup';
import TextButton from './TextButton';
import IconButton from './IconButton';

const meta = {
  title: 'Components/ButtonGroup',
  tags: ['autodocs'],
  component: ButtonGroup,
  args: {
    direction: 'horizontal',
  },
} satisfies Meta<typeof ButtonGroup>;
export default meta;

type Story = StoryObj<typeof meta>;

export const TextButtonGroup: Story = {
  args: {
    children: (
      <>
        <TextButton variant="primary" label="Button 1" />
        <TextButton label="Button 2" />
      </>
    ),
  },
};

export const IconButtonGroup: Story = {
  args: {
    children: (
      <>
        <IconButton icon={FaCheck} variant="primary" />
        <IconButton icon={LuX} />
      </>
    ),
  },
};
