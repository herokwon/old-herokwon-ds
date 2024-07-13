import type { Meta, StoryObj } from '@storybook/react';

import Heading from './Heading';

const meta = {
  title: 'Components/Heading',
  tags: ['autodocs'],
  component: Heading,
  args: {
    as: 'h1',
  },
} satisfies Meta<typeof Heading>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Linkable: Story = {
  args: {
    children: 'Heading 1',
    href: {
      to: '/#',
      replace: false,
    },
  },
};

export const Heading1: Story = {
  args: {
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    as: 'h2',
    children: 'Heading 2',
  },
};

export const Heading3: Story = {
  args: {
    as: 'h3',
    children: 'Heading 3',
  },
};

export const Heading4: Story = {
  args: {
    as: 'h4',
    children: 'Heading 4',
  },
};

export const Heading5: Story = {
  args: {
    as: 'h5',
    children: 'Heading 5',
  },
};

export const Heading6: Story = {
  args: {
    as: 'h6',
    children: 'Heading 6',
  },
};
