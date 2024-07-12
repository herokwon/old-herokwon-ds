import type { Meta, StoryObj } from '@storybook/react';

import Textarea from './Textarea';

const meta = {
  title: 'Components/Textarea',
  tags: ['autodocs'],
  component: Textarea,
  args: {
    className: 'min-w-[345px]',
  },
} satisfies Meta<typeof Textarea>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Text area',
  },
};

export const Required: Story = {
  args: {
    label: 'Required',
    id: 'required-textarea',
    required: true,
    placeholder: 'Required text area',
  },
};

export const MaxLength: Story = {
  args: {
    id: 'limited-textarea',
    placeholder: 'Max Length : 100',
    maxLength: 100,
  },
};

export const HelperMessage: Story = {
  args: {
    helperMessage: 'This is a helper message',
  },
};

export const ErrorMessage: Story = {
  args: {
    errorMessage: 'Error!',
  },
};
