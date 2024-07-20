import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Backdrop from './Backdrop';
import TextButton from './TextButton';

const meta = {
  title: 'Components/Backdrop',
  tags: ['autodocs'],
  component: Backdrop,
  args: {
    isActive: false,
  },
} satisfies Meta<typeof Backdrop>;
export default meta;

type Story = StoryObj<typeof meta>;

const BackdropRender = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof Backdrop>) => {
  const [isActive, setIsActive] = useState<boolean>(props.isActive || false);

  useEffect(() => {
    setIsActive(props.isActive || false);
  }, [props.isActive]);

  return (
    <Backdrop
      isActive={isActive}
      onClick={() => setIsActive(false)}
      triggerItem={
        <TextButton
          label="Click on Button"
          variant="primary"
          onClick={() => setIsActive(prev => !prev)}
        />
      }
    />
  );
};

export const Default: Story = {
  render: ({ ...props }) => <BackdropRender {...props} />,
};
