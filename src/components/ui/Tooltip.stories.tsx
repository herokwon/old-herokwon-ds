import type { Meta, StoryObj } from '@storybook/react';

import Tooltip from './Tooltip';
import TextButton from './TextButton';

const meta = {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  component: Tooltip,
  args: {
    hasTail: true,
    size: 'md',
    position: 'bottom-center',
    triggerItem: <TextButton label="Hover on Button" />,
  },
} satisfies Meta<typeof Tooltip>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip with tail',
  },
};

export const WithoutTail: Story = {
  args: {
    hasTail: false,
    content: 'This is a tooltip without tail',
  },
};
