import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useEffect, useState } from 'react';

import Checkbox from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  component: Checkbox,
  args: {
    isDisabled: false,
    id: crypto.randomUUID(),
    size: 'md',
  },
} satisfies Meta<typeof Checkbox>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: StoryObj<typeof Checkbox> = {
  args: {
    isChecked: false,
    label: 'Default Checkbox Item (Controlled + Uncontrolled)',
  },
  render: ({ ...props }) => {
    const [isChecked, setIsChecked] = useState<boolean>(
      props.isChecked || false,
    );

    useEffect(() => {
      setIsChecked(props.isChecked || false);
    }, [props.isChecked]);

    return (
      <Checkbox
        {...props}
        isChecked={isChecked}
        onChange={useCallback((checked: boolean) => setIsChecked(checked), [])}
      />
    );
  },
};

export const Uncontrolled: Story = {
  args: {
    defaultChecked: true,
    label: 'Uncontrolled Checkbox Item',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    label: 'Disabled Checkbox Item',
  },
};

export const Detail: Story = {
  args: {
    label: 'Detail Checkbox Item',
    description: 'This is a description.',
  },
};

export const ErrorMessage: Story = {
  args: {
    isChecked: false,
    label: 'Error Checkbox Item',
  },
  render: ({ ...props }) => {
    const [isChecked, setIsChecked] = useState<boolean>(
      props.isChecked || false,
    );

    useEffect(() => {
      setIsChecked(props.isChecked || false);
    }, [props.isChecked]);

    return (
      <Checkbox
        {...props}
        isChecked={isChecked}
        onChange={checked => setIsChecked(checked)}
        errorMessage={isChecked ? undefined : 'Error!'}
      />
    );
  },
};
