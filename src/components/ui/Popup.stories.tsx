import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useEffect, useState } from 'react';

import type { ContentWithId } from '../../types';

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

const dummyItems: ContentWithId[] = Array.from({ length: 3 }, (_, i) => ({
  id: crypto.randomUUID(),
  content: `Popup Item ${i + 1}`,
}));

const dummyNestedItems: ContentWithId[] = Array.from({ length: 3 }, (_, j) => ({
  id: crypto.randomUUID(),
  content: `Popup Nested Item ${j + 1}`,
}));

export const Default: Story = {
  render: ({ ...props }) => {
    const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
    const [selectedId, setSelectedId] = useState<string>('');

    useEffect(() => {
      setIsOpen(props.isOpen);
    }, [props.isOpen]);

    return (
      <Popup
        {...props}
        isOpen={isOpen}
        onClose={useCallback(() => setIsOpen(false), [])}
        trigger={
          <TextButton
            label="Click on Button"
            onClick={useCallback(() => setIsOpen(prev => !prev), [])}
          />
        }
      >
        <ListItem variant="unordered">
          {dummyItems.map(({ id, content }) => (
            <ListItem.Text
              key={id}
              id={id}
              isSelected={id === selectedId}
              onClick={useCallback(() => setSelectedId(id), [id])}
            >
              {content}
            </ListItem.Text>
          ))}
        </ListItem>
      </Popup>
    );
  },
};

export const Empty: Story = {
  render: ({ ...props }) => {
    const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

    useEffect(() => {
      setIsOpen(props.isOpen);
    }, [props.isOpen]);

    return (
      <Popup
        {...props}
        isOpen={isOpen}
        onClose={useCallback(() => setIsOpen(false), [])}
        trigger={
          <TextButton
            label="Click on Button"
            onClick={useCallback(() => setIsOpen(prev => !prev), [])}
          />
        }
      >
        <EmptyData className="m-12" emptyMessage="No data" />
      </Popup>
    );
  },
};

export const Nested: StoryObj<typeof Popup> = {
  render: ({ ...props }) => {
    const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
    const [isNestedOpen, setIsNestedOpen] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>('');

    useEffect(() => {
      setIsOpen(props.isOpen);
    }, [props.isOpen]);

    return (
      <Popup
        {...props}
        isOpen={isOpen}
        onClose={useCallback(() => setIsOpen(false), [])}
        className="only:*:last:*:overflow-y-visible"
        trigger={
          <TextButton
            label="Click on Button"
            onClick={useCallback(() => setIsOpen(prev => !prev), [])}
          />
        }
      >
        <ListItem variant="unordered">
          {dummyItems.map(({ id, content }, index) =>
            index === 2 ? (
              <Popup
                key={id}
                isOpen={isNestedOpen}
                position="right-top"
                onClose={useCallback(() => setIsNestedOpen(false), [])}
                trigger={
                  <ListItem.Text
                    key={id}
                    id={id}
                    isSelected={id === selectedId}
                    onClick={useCallback(
                      () => setIsNestedOpen(prev => !prev),
                      [],
                    )}
                  >
                    {content}
                  </ListItem.Text>
                }
              >
                <ListItem variant="unordered">
                  {dummyNestedItems.map(({ id, content }) => (
                    <ListItem.Text
                      key={id}
                      id={id}
                      isSelected={id === selectedId}
                      onClick={useCallback(() => setSelectedId(id), [id])}
                    >
                      {content}
                    </ListItem.Text>
                  ))}
                </ListItem>
              </Popup>
            ) : (
              <ListItem.Text
                key={id}
                id={id}
                isSelected={id === selectedId}
                onClick={useCallback(() => setSelectedId(id), [id])}
              >
                {content}
              </ListItem.Text>
            ),
          )}
        </ListItem>
      </Popup>
    );
  },
};
