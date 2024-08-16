import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Tabs from './Tabs';

const meta = {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  component: Tabs,
  args: {
    isDisabled: false,
    isLoading: false,
    defaultSelectedIndex: 0,
    size: 'md',
    alignX: 'left',
    className: 'min-w-[300px]',
    tabItems: Array.from({ length: 3 }, (_, i) => ({
      index: i,
      heading: `Tab ${i + 1}`,
      content: <p className="w-full">{`This is content for Tab ${i + 1}.`}</p>,
    })),
    onChangeSelectedIndex: fn(),
  },
} satisfies Meta<typeof Tabs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SelectedIndex: Story = {
  args: {
    defaultSelectedIndex: meta.args.tabItems.length - 1,
  },
};

export const AlignCenter: Story = {
  args: {
    alignX: 'center',
  },
};

export const AlignRight: Story = {
  args: {
    alignX: 'right',
  },
};
