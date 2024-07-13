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
    message: 'This is a default banner message',
  },
};

export const InnerLink: Story = {
  args: {
    message: (
      <>
        {`This is a default banner message with `}
        <Link href="/#">link</Link>
      </>
    ),
  },
};

export const Success: Story = {
  args: {
    message: 'This is a success banner message',
    variant: 'success',
  },
};

export const Info: Story = {
  args: {
    message: 'This is an info banner message',
    variant: 'info',
  },
};

export const Warning: Story = {
  args: {
    message: 'This is a warning banner message',
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    message: 'This is a danger banner message',
    variant: 'danger',
  },
};
