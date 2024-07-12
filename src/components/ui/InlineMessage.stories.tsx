import type { Meta, StoryObj } from '@storybook/react';

import InlineMessage from './InlineMessage';

const meta = {
  title: 'Components/InlineMessage',
  tags: ['autodocs'],
  component: InlineMessage,
  args: {
    variant: 'default',
    size: 'md',
  },
} satisfies Meta<typeof InlineMessage>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: 'Heading',
    message: 'This is a default inline message with heading',
  },
};

export const Success: Story = {
  args: {
    message: 'This is a success inline message',
    variant: 'success',
  },
};

export const Info: Story = {
  args: {
    message: 'This is an info inline message',
    variant: 'info',
  },
};

export const Warning: Story = {
  args: {
    message: 'This is a warning inline message',
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    message: 'This is a danger inline message',
    variant: 'danger',
  },
};
