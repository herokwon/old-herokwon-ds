import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import Modal from './Modal';
import TextButton from './TextButton';

const meta = {
  title: 'Components/Modal',
  tags: ['autodocs'],
  component: Modal,
  args: {
    isActive: false,
    variant: 'default',
  },
} satisfies Meta<typeof Modal>;
export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: ({ ...props }) => {
    const [isActive, setIsActive] = useState<boolean>(props.isActive || false);

    useEffect(() => {
      setIsActive(props.isActive || false);
    }, [props.isActive]);

    return (
      <Modal
        {...props}
        isActive={isActive}
        onClose={() => setIsActive(false)}
        heading={'Hello!'}
        trigger={
          <TextButton
            label="Open Modal"
            variant="primary"
            onClick={() => setIsActive(prev => !prev)}
          />
        }
      >
        <p>
          This is a modal component composed by <code>dialog</code>.
        </p>
      </Modal>
    );
  },
};
