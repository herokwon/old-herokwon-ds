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
    stopPropagation: false,
    preventDefault: false,
    variant: 'default',
    size: 'sm',
    spacing: 'compact',
  },
} satisfies Meta<typeof Tag>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Tag',
  },
};

export const Link: Story = {
  args: {
    label: 'Link Tag',
    href: {
      to: '/#',
      replace: false,
    },
  },
};

export const Removable: Story = {
  args: {
    label: 'Removable Tag',
    isRemovable: true,
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Tag',
    variant: 'secondary',
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning Tag',
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger Tag',
    variant: 'danger',
  },
};
