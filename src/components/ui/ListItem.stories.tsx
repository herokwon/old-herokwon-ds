import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import type { FloatingItem, SelectingInput } from '../../types';
import ListItem from './ListItem';

const meta = {
  title: 'Components/ListItem',
  tags: ['autodocs'],
  component: ListItem,
} satisfies Meta<typeof ListItem>;
export default meta;

type Story = StoryObj<typeof ListItem>;

const dummyItems: FloatingItem[] = Array.from({ length: 3 }, (_, i) => ({
  children: `List Item ${i + 1}`,
  id: crypto.randomUUID(),
}));

const ListItemRender = ({
  selectingInput,
}: {
  selectingInput: SelectingInput;
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([dummyItems[0].id]);

  return (
    <ul className="w-full space-y-2">
      {dummyItems.map(({ children, id }) =>
        selectingInput === 'radio' ? (
          <ListItem.Radio
            key={id}
            isSelected={selectedIds.includes(id)}
            id={id}
            onChange={() => setSelectedIds([id])}
          >
            {children}
          </ListItem.Radio>
        ) : selectingInput === 'checkbox' ? (
          <ListItem.Checkbox
            key={id}
            isSelected={selectedIds.includes(id)}
            id={id}
            onChange={() =>
              setSelectedIds(prev =>
                prev.includes(id)
                  ? prev.filter(value => value !== id)
                  : [...prev, id],
              )
            }
          >
            {children}
          </ListItem.Checkbox>
        ) : (
          <ListItem.Text
            key={id}
            isSelected={selectedIds.includes(id)}
            id={id}
            onClick={() =>
              setSelectedIds(
                selectingInput === 'text'
                  ? [id]
                  : prev =>
                      prev.includes(id)
                        ? prev.filter(value => value !== id)
                        : [...prev, id],
              )
            }
          >
            {children}
          </ListItem.Text>
        ),
      )}
    </ul>
  );
};

export const TextItem: Story = {
  render: () => <ListItemRender selectingInput="text" />,
};

export const MultiTextItem: Story = {
  render: () => <ListItemRender selectingInput="multi-text" />,
};

export const RadioItem: Story = {
  render: () => <ListItemRender selectingInput="radio" />,
};

export const CheckboxItem: Story = {
  render: () => <ListItemRender selectingInput="checkbox" />,
};
