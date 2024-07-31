import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FaCheck, FaXmark } from 'react-icons/fa6';

import Toggle from './Toggle';

const meta = {
  title: 'Components/Toggle',
  tags: ['autodocs'],
  component: Toggle,
  args: {
    size: 'md',
    isDisabled: false,
    isActive: false,
  },
} satisfies Meta<typeof Toggle>;
export default meta;

type Story = StoryObj<typeof Toggle>;

const ToggleRender = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof Toggle>) => {
  const [isActive, setIsActive] = useState<boolean>(props.isActive || false);

  useEffect(() => {
    setIsActive(props.isActive);
  }, [props.isActive]);

  return <Toggle {...props} isActive={isActive} setIsActive={setIsActive} />;
};

export const Default: Story = {
  render: ({ ...props }) => <ToggleRender {...props} />,
};

export const Icon: Story = {
  args: {
    activeIcon: FaCheck,
    inactiveIcon: FaXmark,
  },
  render: ({ ...props }) => <ToggleRender {...props} />,
};
