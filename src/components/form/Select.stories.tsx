import type { Meta, StoryObj } from '@storybook/react';

import Select from './Select';

const meta = {
  title: 'Components/Select',
  tags: ['autodocs'],
  component: Select,
  args: {
    isDisabled: false,
    isLoading: false,
    shouldWrapItems: false,
    className: 'w-[300px]',
    options: Array.from({ length: 10 }, (_, i) => ({
      id: crypto.randomUUID(),
      label: `Select Item ${i + 1}`,
      description:
        i < 5 ? undefined : `This is a description for Select Item ${i + 1}`,
    })),
  },
} satisfies Meta<typeof Select>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    selectingInput: 'text',
    placeholder: 'Select item..',
  },
};

export const MultiText: Story = {
  args: {
    selectingInput: 'multi-text',
    placeholder: 'Select items..',
  },
};

export const Radio: Story = {
  args: {
    selectingInput: 'radio',
    placeholder: 'Select item..',
  },
};

export const Checkbox: Story = {
  args: {
    selectingInput: 'checkbox',
    placeholder: 'Select items..',
  },
};
