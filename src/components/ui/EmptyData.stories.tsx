import type { Meta, StoryObj } from '@storybook/react';

import EmptyData from './EmptyData';

const meta = {
  title: 'Components/EmptyData',
  tags: ['autodocs'],
  component: EmptyData,
} satisfies Meta<typeof EmptyData>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
