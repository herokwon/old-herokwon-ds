import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Tabs from './Tabs';

const meta = {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  component: Tabs,
  args: {
    defaultSelectedIndex: 0,
    size: 'md',
    className: 'min-w-[480px]',
    tabItems: Array.from({ length: 3 }, (_, i) => ({
      isDisabled: i === 2,
      isLoading: false,
      heading: `Tab ${i + 1}`,
      content: (
        <div className="h-100 w-full">
          <p className="w-full">{`This is content for Tab ${i + 1}.`}</p>
        </div>
      ),
    })),
    onChangeSelectedIndex: fn(),
  },
} satisfies Meta<typeof Tabs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SelectedIndex: Story = {
  args: {
    defaultSelectedIndex: 1,
  },
};
