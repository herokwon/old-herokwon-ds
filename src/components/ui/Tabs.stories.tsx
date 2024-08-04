import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Tabs from './Tabs';

const meta = {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  component: Tabs,
  args: {
    isDisabled: false,
    isLoading: false,
    size: 'sm',
    alignX: 'left',
    className: 'min-w-[300px]',
    selectedIndex: 0,
    tabItems: Array.from({ length: 3 }, (_, i) => ({
      index: i,
      heading: `Tab ${i + 1}`,
      content: (
        <div className="w-full">
          <p className="w-full">{`This is content for Tab ${i + 1}.`}</p>
        </div>
      ),
    })),
  },
} satisfies Meta<typeof Tabs>;
export default meta;

type Story = StoryObj<typeof Tabs>;

const TabsRender = ({
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Tabs>, 'setSelectedIndex'>) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(
    props.selectedIndex,
  );

  return (
    <Tabs
      {...props}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
    />
  );
};

export const Default: Story = {
  render: ({ ...props }) => <TabsRender {...props} />,
};

export const SelectedIndex: Story = {
  args: {
    selectedIndex: meta.args.tabItems.length - 1,
  },
  render: ({ ...props }) => <TabsRender {...props} />,
};

export const AlignCenter: Story = {
  args: {
    alignX: 'center',
  },
  render: ({ ...props }) => <TabsRender {...props} />,
};

export const AlignRight: Story = {
  args: {
    alignX: 'right',
  },
  render: ({ ...props }) => <TabsRender {...props} />,
};
