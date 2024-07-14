import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Modal from './Modal';
import TextButton from './TextButton';
import InlineMessage from './InlineMessage';

const meta = {
  title: 'Components/Modal',
  tags: ['autodocs'],
  component: Modal.Container,
  args: {
    id: crypto.randomUUID(),
  },
} satisfies Meta<typeof Modal.Container>;
export default meta;

type Story = StoryObj<typeof Modal.Container>;

const ModalRender = ({
  ...props
}: Omit<React.ComponentProps<typeof Modal.Container>, 'setIsActive'>) => {
  const [isActive, setIsActive] = useState<boolean>(props.isActive ?? false);

  useEffect(() => {
    setIsActive(props.isActive ?? false);
  }, [props.isActive]);

  return (
    <Modal.Wrapper
      isActive={isActive}
      setIsActive={setIsActive}
      triggerItem={
        <TextButton
          label="Open Modal"
          variant="primary"
          onClick={() => setIsActive(true)}
        />
      }
    >
      <Modal.Container {...props}>
        <InlineMessage message="This is a modal." />
      </Modal.Container>
    </Modal.Wrapper>
  );
};

export const Default: Story = {
  render: ({ ...props }) => <ModalRender {...props} />,
};
