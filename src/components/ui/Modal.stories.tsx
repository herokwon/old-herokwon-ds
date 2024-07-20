import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Modal from './Modal';
import TextButton from './TextButton';
import Heading from './Heading';

const meta = {
  title: 'Components/Modal',
  tags: ['autodocs'],
  component: Modal,
  args: {
    isActive: false,
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
        isActive={isActive}
        onClose={() => setIsActive(false)}
        trigger={
          <TextButton
            label="Open Modal"
            variant="primary"
            onClick={() => setIsActive(prev => !prev)}
          />
        }
      >
        <Heading>Hello!</Heading>
        <p>
          This is a modal component composed by <code>dialog</code>.
        </p>
      </Modal>
    );
  },
};
