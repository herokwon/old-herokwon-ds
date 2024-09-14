import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';

import type { SelectingInput } from '../../types/form';
import type { FloatingItem } from '../../types/ui';

import ListItem from './ListItem';

const meta = {
  title: 'Components/ListItem',
  tags: ['autodocs'],
  component: ListItem,
} satisfies Meta<typeof ListItem>;
export default meta;

type Story = StoryObj<typeof ListItem>;

const dummyItems: FloatingItem[] = Array.from({ length: 3 }, (_, i) => ({
  id: crypto.randomUUID(),
  content: `List Item ${i + 1}`,
}));

const ListItemRender = ({
  selectingInput,
}: {
  selectingInput: SelectingInput;
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([dummyItems[0].id]);

  return (
    <ListItem variant="unordered" className="space-y-2">
      {dummyItems.map(({ id, content }) =>
        selectingInput === 'radio' ? (
          <ListItem.Radio
            key={id}
            id={id}
            isSelected={selectedIds.includes(id)}
            onChange={useCallback(() => setSelectedIds([id]), [id])}
          >
            {content}
          </ListItem.Radio>
        ) : selectingInput === 'checkbox' ? (
          <ListItem.Checkbox
            key={id}
            id={id}
            isSelected={selectedIds.includes(id)}
            onChange={useCallback(
              () =>
                setSelectedIds(prev =>
                  prev.includes(id)
                    ? prev.filter(value => value !== id)
                    : [...prev, id],
                ),
              [id],
            )}
          >
            {content}
          </ListItem.Checkbox>
        ) : (
          <ListItem.Text
            key={id}
            id={id}
            isSelected={selectedIds.includes(id)}
            onClick={useCallback(
              () =>
                setSelectedIds(
                  selectingInput === 'text'
                    ? [id]
                    : prev =>
                        prev.includes(id)
                          ? prev.filter(value => value !== id)
                          : [...prev, id],
                ),
              [id],
            )}
          >
            {content}
          </ListItem.Text>
        ),
      )}
    </ListItem>
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
