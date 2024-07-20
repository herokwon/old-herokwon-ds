import type { Meta, StoryObj } from '@storybook/react';
import Link from 'next/link';

import Banner from './Banner';

const meta = {
  title: 'Components/Banner',
  tags: ['autodocs'],
  component: Banner,
  args: {
    variant: 'default',
    size: 'md',
  },
} satisfies Meta<typeof Banner>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a default banner message',
  },
};

export const InnerLink: StoryObj<typeof Banner> = {
  render: ({ ...props }) => (
    <Banner {...props} variant="info">
      This is a default banner message with&nbsp;
      <Link href="/#">link</Link>
    </Banner>
  ),
};

export const Success: Story = {
  args: {
    children: 'This is a success banner message',
    variant: 'success',
  },
};

export const Info: Story = {
  args: {
    children: 'This is an info banner message',
    variant: 'info',
  },
};

export const Warning: Story = {
  args: {
    children: 'This is a warning banner message',
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    children: 'This is a danger banner message',
    variant: 'danger',
  },
};
