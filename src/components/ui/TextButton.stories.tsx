import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { FaCheck } from 'react-icons/fa6';

import TextButton from './TextButton';

const meta = {
  title: 'Components/Buttons/TextButton',
  tags: ['autodocs'],
  component: TextButton,
  args: {
    isDisabled: false,
    isSelected: false,
    isLoading: false,
    stopPropagation: false,
    preventDefault: false,
    variant: 'default',
    size: 'md',
    spacing: 'default',
    shape: 'square',
    onClick: fn(),
  },
} satisfies Meta<typeof TextButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default',
  },
};

export const Link: Story = {
  args: {
    label: 'Link',
    href: {
      to: '/#',
      replace: false,
    },
  },
};

export const IconBefore: Story = {
  args: {
    label: 'Icon Before',
    iconBefore: {
      content: FaCheck,
    },
  },
};
export const IconAfter: Story = {
  args: {
    label: 'Icon After',
    iconAfter: {
      content: FaCheck,
    },
  },
};

export const Primary: Story = {
  args: {
    label: 'Primary',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary',
    variant: 'secondary',
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning',
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger',
    variant: 'danger',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    isDisabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading',
    isLoading: true,
  },
};
