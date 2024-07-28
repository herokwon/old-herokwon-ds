import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import type { ToastMessageVariant } from '../../types';
import ToastMessage from './ToastMessage';

const meta = {
  title: 'Components/ToastMessage',
  tags: ['autodocs'],
  component: ToastMessage,
} satisfies Meta<typeof ToastMessage>;
export default meta;

type Story = StoryObj<typeof ToastMessage>;

const ToastMessageRender = ({
  variant,
  message,
}: {
  variant: ToastMessageVariant;
  message: string;
}) => {
  const [messages, setMessages] = useState<
    React.ComponentPropsWithoutRef<typeof ToastMessage>['messages']
  >([
    {
      id: crypto.randomUUID(),
      variant,
      message,
      duration: 4000,
    },
  ]);

  useEffect(() => {
    const autoClose = setTimeout(() => {
      setMessages([]);
      clearTimeout(autoClose);
    }, 4000);
  }, []);

  return (
    <ToastMessage
      position="top-center"
      messages={messages}
      closeMessage={() => setMessages([])}
    />
  );
};

export const Success: Story = {
  render: () => (
    <ToastMessageRender variant="success" message="This is a success message" />
  ),
};

export const Error: Story = {
  render: () => (
    <ToastMessageRender variant="danger" message="This is an error message" />
  ),
};

export const Warning: Story = {
  render: () => (
    <ToastMessageRender variant="warning" message="This is a warning message" />
  ),
};

export const Info: Story = {
  render: () => (
    <ToastMessageRender variant="info" message="This is an info message" />
  ),
};
