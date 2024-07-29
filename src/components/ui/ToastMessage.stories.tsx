import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import type {
  ToastMessageConfig,
  ToastMessage as ToastMessageType,
} from '../../types';
import ToastMessage from './ToastMessage';

const meta = {
  title: 'Components/ToastMessage',
  tags: ['autodocs'],
  component: ToastMessage,
  args: {
    position: 'top-center',
  },
} satisfies Meta<typeof ToastMessage>;
export default meta;

type Story = StoryObj<typeof ToastMessage>;

const ToastMessageRender = ({
  position,
  variant,
  message,
}: Pick<ToastMessageConfig, 'position'> &
  Pick<ToastMessageType, 'variant' | 'message'>) => {
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

  return (
    <ToastMessage
      position={position}
      messages={messages}
      closeMessage={() => setMessages([])}
    />
  );
};

export const Success: Story = {
  render: ({ position }) => (
    <ToastMessageRender
      position={position}
      variant="success"
      message="This is a success message"
    />
  ),
};

export const Error: Story = {
  render: ({ position }) => (
    <ToastMessageRender
      position={position}
      variant="danger"
      message="This is an error message"
    />
  ),
};

export const Warning: Story = {
  render: ({ position }) => (
    <ToastMessageRender
      position={position}
      variant="warning"
      message="This is a warning message"
    />
  ),
};

export const Info: Story = {
  render: ({ position }) => (
    <ToastMessageRender
      position={position}
      variant="info"
      message="This is an info message"
    />
  ),
};
