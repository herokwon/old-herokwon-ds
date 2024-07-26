import type { Meta, StoryObj } from '@storybook/react';

import Code from './Code';

const meta = {
  title: 'Components/Code',
  tags: ['autodocs'],
  component: Code,
  args: {
    children: 'Code',
  },
} satisfies Meta<typeof Code>;
export default meta;

type Story = StoryObj<typeof Code>;

export const Default: Story = {
  render: ({ ...props }) => (
    <p>
      This is a <Code>code</Code>.
    </p>
  ),
};
