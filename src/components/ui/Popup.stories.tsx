import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';

import EmptyData from './EmptyData';
import ListItem from './ListItem';
import Popup from './Popup';
import TextButton from './TextButton';

const meta = {
  title: 'Components/Popup',
  tags: ['autodocs'],
  component: Popup,
  args: {
    isLoading: false,
    isOpen: false,
    position: 'bottom-center',
  },
} satisfies Meta<typeof Popup>;
export default meta;

type Story = StoryObj<typeof Popup>;

const PopupRender = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Popup>) => {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  return (
    <Popup
      {...props}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      className="only:*:last:*:overflow-visible"
      trigger={
        <TextButton
          label="Click on Button"
          onClick={() => setIsOpen(prev => !prev)}
        />
      }
    >
      {children}
    </Popup>
  );
};

export const Default: Story = {
  render: ({ ...props }) => (
    <PopupRender {...props}>
      {Array.from({ length: 3 }, (_, i) => (
        <ListItem.Text key={i} id={crypto.randomUUID()}>
          {`Popup Item ${i + 1}`}
        </ListItem.Text>
      ))}
    </PopupRender>
  ),
};

export const Empty: Story = {
  render: ({ ...props }) => (
    <PopupRender {...props}>
      <EmptyData />
    </PopupRender>
  ),
};

export const Nested: StoryObj<typeof Popup> = {
  render: ({ ...props }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
      <PopupRender {...props}>
        {Array.from({ length: 3 }, (_, i) =>
          i === 2 ? (
            <Popup
              key={i}
              isOpen={isOpen}
              position="right-top"
              onClose={() => setIsOpen(false)}
              trigger={
                <ListItem.Text
                  key={i}
                  id={crypto.randomUUID()}
                  onClick={() => setIsOpen(prev => !prev)}
                  elemAfter={<FaArrowRight className="my-auto" />}
                >
                  {`Popup Item ${i + 1}`}
                </ListItem.Text>
              }
            >
              {Array.from({ length: 3 }, (_, j) => (
                <ListItem.Text key={j} id={crypto.randomUUID()}>
                  {`Popup Nested Item ${j + 1}`}
                </ListItem.Text>
              ))}
            </Popup>
          ) : (
            <ListItem.Text key={i} id={crypto.randomUUID()}>
              {`Popup Item ${i + 1}`}
            </ListItem.Text>
          ),
        )}
      </PopupRender>
    );
  },
};
