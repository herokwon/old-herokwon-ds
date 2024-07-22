import type { Meta, StoryObj } from '@storybook/react';

import EmptyImage from './EmptyImage';

const meta = {
  title: 'Components/EmptyImage',
  tags: ['autodocs'],
  component: EmptyImage,
} satisfies Meta<typeof EmptyImage>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
