import type { Meta, StoryObj } from '@storybook/react';

import Tag from './Tag';

const meta = {
  title: 'Components/Tag',
  tags: ['autodocs'],
  component: Tag,
  args: {
    isDisabled: false,
    isLoading: false,
    isRemovable: false,
    variant: 'default',
    size: 'sm',
    spacing: 'compact',
  },
} satisfies Meta<typeof Tag>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Tag',
  },
};

export const Link: Story = {
  args: {
    children: 'Link Tag',
    href: {
      to: '/#',
      replace: false,
    },
  },
};

export const Removable: Story = {
  args: {
    children: 'Removable Tag',
    isRemovable: true,
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Tag',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Tag',
    variant: 'secondary',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning Tag',
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger Tag',
    variant: 'danger',
  },
};
