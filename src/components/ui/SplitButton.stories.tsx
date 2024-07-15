import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import SplitButton from './SplitButton';

const meta = {
  title: 'Components/Buttons/SplitButton',
  tags: ['autodocs'],
  component: SplitButton,
  args: {
    isDisabled: false,
    isSelected: false,
    isLoading: false,
    defaultLabel: 'Default label',
    size: 'md',
    spacing: 'default',
  },
} satisfies Meta<typeof SplitButton>;
export default meta;

type Story = StoryObj<typeof SplitButton>;

const SplitButtonRender = ({
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof SplitButton>,
  'items' | 'setItems'
>) => {
  const [items, setItems] = useState<
    React.ComponentPropsWithoutRef<typeof SplitButton>['items']
  >([
    ...Array.from({ length: 3 }, (_, i) => ({
      id: crypto.randomUUID(),
      heading: `Item ${i + 1}`,
      description: `This is optional description for item ${i + 1}.`,
      isDisabled: i === 2,
      isSelected: false,
      onClick: fn(),
    })),
  ]);

  return <SplitButton {...props} items={items} setItems={setItems} />;
};

export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: ({ ...props }) => <SplitButtonRender {...props} />,
};

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: ({ ...props }) => <SplitButtonRender {...props} />,
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: ({ ...props }) => <SplitButtonRender {...props} />,
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  render: ({ ...props }) => <SplitButtonRender {...props} />,
};
