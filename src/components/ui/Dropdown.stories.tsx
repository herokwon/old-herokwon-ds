import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useEffect, useState } from 'react';

import type { ElementStatus } from '../../types';

import type { FloatingItem, FloatingItemGroup } from '../../types/ui';

import Dropdown from './Dropdown';
import TextButton from './TextButton';

const meta = {
  title: 'Components/Dropdown',
  tags: ['autodocs'],
  component: Dropdown,
  args: {
    isLoading: false,
    isOpen: false,
    position: 'bottom-center',
    direction: 'vertical',
  },
} satisfies Meta<typeof Dropdown>;
export default meta;

type Story = StoryObj<typeof Dropdown>;

const dummyItems: FloatingItem[] = Array.from({ length: 3 }, (_, i) => ({
  id: crypto.randomUUID(),
  content: `Dropdown Item ${i + 1}`,
  description:
    i === 2 ? `This is a description for Dropdown Item ${i + 1}` : undefined,
}));

const dummyGroupItems: FloatingItemGroup[] = Array.from(
  { length: 4 },
  (_, i) => ({
    id: crypto.randomUUID(),
    heading: `Group ${i + 1}`,
    items: Array.from({ length: 3 }, (_, j) => ({
      id: crypto.randomUUID(),
      content: `Dropdown Item ${j + 1}`,
      description:
        i === 2
          ? `This is a description for Dropdown Item ${j + 1}`
          : undefined,
    })),
  }),
);

const DropdownRender = ({
  children,
  isDisabled,
  isLoading,
  ...props
}: Pick<ElementStatus, 'isDisabled'> &
  Omit<
    React.ComponentPropsWithoutRef<typeof Dropdown>,
    'onClose' | 'trigger'
  >) => {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  return (
    <Dropdown
      {...props}
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trigger={
        <TextButton
          isDisabled={isDisabled}
          label="Click on Button"
          onClick={() => setIsOpen(prev => !prev)}
        />
      }
    >
      {children}
    </Dropdown>
  );
};

export const Disabled: Story = {
  render: ({ children, ...props }) => {
    return <DropdownRender {...props} isDisabled isOpen={false} />;
  },
};

export const TextItem: Story = {
  render: ({ children, isLoading, ...props }) => {
    const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
    const [selectedId, setSelectedId] = useState<string>(dummyItems[0].id);

    useEffect(() => {
      setIsOpen(props.isOpen);
    }, [props.isOpen]);

    useEffect(() => {
      setIsOpen(false);
    }, [selectedId]);

    return (
      <Dropdown
        {...props}
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={
          <TextButton
            label="Click on Button"
            onClick={() => setIsOpen(prev => !prev)}
          />
        }
      >
        <Dropdown.TextGroup>
          {dummyItems.map(({ content, id, description }) => (
            <Dropdown.Text
              key={id}
              isSelected={id === selectedId}
              id={id}
              description={description}
              onClick={useCallback(() => setSelectedId(id), [id])}
            >
              {content}
            </Dropdown.Text>
          ))}
        </Dropdown.TextGroup>
      </Dropdown>
    );
  },
};

export const MultiTextItem: Story = {
  render: ({ children, isLoading, ...props }) => {
    const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
    const [selectedItem, setSelectedItem] = useState<string[]>([
      dummyItems[0].id,
    ]);

    useEffect(() => {
      setIsOpen(props.isOpen);
    }, [props.isOpen]);

    return (
      <Dropdown
        {...props}
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={
          <TextButton
            label="Click on Button"
            onClick={() => setIsOpen(prev => !prev)}
          />
        }
      >
        <Dropdown.TextGroup>
          {dummyItems.map(({ id, content, description }) => (
            <Dropdown.Text
              key={id}
              id={id}
              description={description}
              isSelected={selectedItem.includes(id)}
              onClick={useCallback(
                () =>
                  setSelectedItem(prev =>
                    prev.includes(id)
                      ? prev.filter(value => value !== id)
                      : [...prev, id],
                  ),
                [id],
              )}
            >
              {content}
            </Dropdown.Text>
          ))}
        </Dropdown.TextGroup>
      </Dropdown>
    );
  },
};

export const RadioItem: Story = {
  render: ({ children, isLoading, ...props }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>(dummyItems[0].id);

    useEffect(() => {
      setIsOpen(props.isOpen);
    }, [props.isOpen]);

    useEffect(() => {
      setIsOpen(false);
    }, [selectedId]);

    return (
      <Dropdown
        {...props}
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={
          <TextButton
            label="Click on Button"
            onClick={() => setIsOpen(prev => !prev)}
          />
        }
      >
        <Dropdown.RadioGroup>
          {dummyItems.map(({ id, content, description }) => (
            <Dropdown.Radio
              key={id}
              id={id}
              description={description}
              isSelected={id === selectedId}
              onChange={useCallback(() => setSelectedId(id), [id])}
            >
              {content}
            </Dropdown.Radio>
          ))}
        </Dropdown.RadioGroup>
      </Dropdown>
    );
  },
};

export const CheckboxItem: Story = {
  render: ({ children, isLoading, ...props }) => {
    const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
    const [selectedItem, setSelectedItem] = useState<string[]>([
      dummyItems[0].id,
    ]);

    useEffect(() => {
      setIsOpen(props.isOpen);
    }, [props.isOpen]);

    useEffect(() => {
      selectedItem.length === 0 && setIsOpen(false);
    }, [selectedItem]);

    return (
      <Dropdown
        {...props}
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={
          <TextButton
            label="Click on Button"
            onClick={() => setIsOpen(prev => !prev)}
          />
        }
      >
        <Dropdown.CheckboxGroup
          heading="Checkbox Heading"
          isSelected={selectedItem.length === dummyItems.length}
          onChange={checked =>
            setSelectedItem(checked ? dummyItems.map(({ id }) => id) : [])
          }
        >
          {dummyItems.map(({ id, content, description }) => (
            <Dropdown.Checkbox
              key={id}
              id={id}
              description={description}
              isSelected={selectedItem.includes(id)}
              onChange={useCallback(
                () =>
                  setSelectedItem(prev =>
                    prev.includes(id)
                      ? prev.filter(value => value !== id)
                      : [...prev, id],
                  ),
                [id],
              )}
            >
              {content}
            </Dropdown.Checkbox>
          ))}
        </Dropdown.CheckboxGroup>
      </Dropdown>
    );
  },
};

export const MixedItem: Story = {
  render: ({ isLoading, ...props }) => {
    const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);
    const [selectedItem, setSelectedItem] = useState<Map<string, string[]>>(
      new Map(
        dummyGroupItems.map(dummyGroupItem => [
          dummyGroupItem.id,
          [dummyGroupItem.items[0].id],
        ]),
      ),
    );

    useEffect(() => {
      setIsOpen(props.isOpen);
    }, [props.isOpen]);

    return (
      <Dropdown
        {...props}
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={
          <TextButton
            label="Click on Button"
            onClick={() => setIsOpen(prev => !prev)}
          />
        }
      >
        <Dropdown.TextGroup
          id={dummyGroupItems[0].id}
          heading={dummyGroupItems[0].heading}
        >
          {dummyGroupItems[0].items.map(({ id, content, description }) => (
            <Dropdown.Text
              key={id}
              id={id}
              description={description}
              isSelected={selectedItem.get(dummyGroupItems[0].id)?.includes(id)}
              onClick={useCallback(
                () =>
                  setSelectedItem(
                    prev => new Map(prev.set(dummyGroupItems[0].id, [id])),
                  ),
                [id],
              )}
            >
              {content}
            </Dropdown.Text>
          ))}
        </Dropdown.TextGroup>
        <Dropdown.TextGroup
          id={dummyGroupItems[1].id}
          heading={dummyGroupItems[1].heading}
        >
          {dummyGroupItems[1].items.map(({ id, content, description }) => (
            <Dropdown.Text
              key={id}
              id={id}
              description={description}
              isSelected={selectedItem.get(dummyGroupItems[1].id)?.includes(id)}
              onClick={useCallback(
                () =>
                  setSelectedItem(
                    prev =>
                      new Map(
                        prev.set(
                          dummyGroupItems[1].id,
                          selectedItem.get(dummyGroupItems[1].id)?.includes(id)
                            ? (selectedItem
                                .get(dummyGroupItems[1].id)
                                ?.filter(value => value !== id) ?? [])
                            : [
                                ...(selectedItem.get(dummyGroupItems[1].id) ??
                                  []),
                                id,
                              ],
                        ),
                      ),
                  ),
                [id],
              )}
            >
              {content}
            </Dropdown.Text>
          ))}
        </Dropdown.TextGroup>
        <Dropdown.RadioGroup
          id={dummyGroupItems[2].id}
          heading={dummyGroupItems[2].heading}
        >
          {dummyGroupItems[2].items.map(({ id, content, description }) => (
            <Dropdown.Radio
              key={id}
              id={id}
              description={description}
              isSelected={selectedItem.get(dummyGroupItems[2].id)?.includes(id)}
              onChange={useCallback(
                () =>
                  setSelectedItem(
                    prev => new Map(prev.set(dummyGroupItems[2].id, [id])),
                  ),
                [id],
              )}
            >
              {content}
            </Dropdown.Radio>
          ))}
        </Dropdown.RadioGroup>
        <Dropdown.CheckboxGroup
          id={dummyGroupItems[3].id}
          heading={dummyGroupItems[3].heading}
          isSelected={
            selectedItem.get(dummyGroupItems[3].id)?.length ===
            dummyGroupItems[3].items.length
          }
          onChange={checked =>
            setSelectedItem(
              prev =>
                new Map(
                  prev.set(
                    dummyGroupItems[3].id,
                    checked ? dummyGroupItems[3].items.map(({ id }) => id) : [],
                  ),
                ),
            )
          }
        >
          {dummyGroupItems[3].items.map(({ id, content, description }) => (
            <Dropdown.Checkbox
              key={id}
              id={id}
              description={description}
              isSelected={selectedItem.get(dummyGroupItems[3].id)?.includes(id)}
              onChange={useCallback(
                (checked: boolean) =>
                  setSelectedItem(
                    prev =>
                      new Map(
                        prev.set(
                          dummyGroupItems[3].id,
                          checked
                            ? [...(prev.get(dummyGroupItems[3].id) ?? []), id]
                            : (prev
                                .get(dummyGroupItems[3].id)
                                ?.filter(value => value !== id) ?? []),
                        ),
                      ),
                  ),
                [id],
              )}
            >
              {content}
            </Dropdown.Checkbox>
          ))}
        </Dropdown.CheckboxGroup>
      </Dropdown>
    );
  },
};
