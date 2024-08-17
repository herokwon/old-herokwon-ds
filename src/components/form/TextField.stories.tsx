import type { Meta, StoryObj } from '@storybook/react';
import { FaRegEnvelope } from 'react-icons/fa6';
import { LuLock } from 'react-icons/lu';

import TextField from './TextField';

const meta = {
  title: 'Components/TextField',
  tags: ['autodocs'],
  component: TextField,
  args: {
    isDisabled: false,
    type: 'text',
    size: 'md',
  },
} satisfies Meta<typeof TextField>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Text input',
  },
};

export const Required: Story = {
  args: {
    label: 'Required',
    id: 'required-input',
    required: true,
  },
};

export const MaxLength: Story = {
  args: {
    id: 'limited-input',
    maxLength: 10,
    placeholder: 'Max Length : 10',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    label: 'Email',
    id: 'email-input',
    fieldIcon: FaRegEnvelope,
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
    id: 'password-input',
    fieldIcon: LuLock,
  },
};

export const HelperMessage: Story = {
  args: {
    placeholder: 'Text Input',
    helperMessage: 'This is a helper message',
  },
};

export const ErrorMessage: Story = {
  args: {
    placeholder: 'Text Input',
    errorMessage: 'Error!',
  },
};
