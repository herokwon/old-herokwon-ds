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
    className: 'min-w-[480px]',
    tabItems: Array.from({ length: 3 }, (_, i) => ({
      index: i,
      heading: `Tab ${i + 1}`,
      content: (
        <div className="h-100 w-full rounded-ms px-4 py-3 shadow-primary-light shadow-light-tertiary dark:bg-dark-secondary dark:shadow-primary-dark">
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
    defaultSelectedIndex: meta.args.tabItems.length - 1,
  },
};
