import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import type { ContentWithId } from '../../types';
import Select from './Select';

const meta = {
  title: 'Components/Select',
  tags: ['autodocs'],
  component: Select,
  args: {
    isDisabled: false,
    isLoading: false,
  },
} satisfies Meta<typeof Select>;
export default meta;

type Story = StoryObj<typeof Select>;

const SelectRender = ({
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof Select>,
  'items' | 'setItems'
>) => {
  const [items, setItems] = useState<ContentWithId[]>([
    ...Array.from({ length: 10 }, (_, i) => ({
      isDisabled: false,
      isSelected: false,
      isLoading: false,
      id: crypto.randomUUID(),
      heading: `item ${i + 1}`,
      description:
        i < 5 ? undefined : `This is a description for item ${i + 1}`,
    })),
  ]);

  return (
    <div className="w-300">
      <Select {...props} items={items} setItems={setItems} />
    </div>
  );
};

export const Text: Story = {
  args: {
    selectingInput: 'text',
    placeholder: 'Select item..',
  },
  render: ({ ...props }) => <SelectRender {...props} />,
};

export const MultiText: Story = {
  args: {
    selectingInput: 'multi-text',
    placeholder: 'Select items..',
  },
  render: ({ ...props }) => <SelectRender {...props} />,
};

export const Radio: Story = {
  args: {
    selectingInput: 'radio',
    placeholder: 'Select item..',
  },
  render: ({ ...props }) => <SelectRender {...props} />,
};

export const Checkbox: Story = {
  args: {
    selectingInput: 'checkbox',
    placeholder: 'Select items..',
  },
  render: ({ ...props }) => <SelectRender {...props} />,
};
