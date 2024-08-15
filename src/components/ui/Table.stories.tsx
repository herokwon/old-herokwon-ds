import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LuChevronRight } from 'react-icons/lu';

import Table from './Table';
import TextButton from './TextButton';

interface DummyDefaultItem {
  id: string;
  name: string;
  age?: number;
}

interface DummyTreeItem extends Pick<DummyDefaultItem, 'id' | 'age'> {
  name: {
    content: string;
    memo?: string;
  };
}

const meta = {
  title: 'Components/Table',
  tags: ['autodocs'],
  component: Table,
  args: {
    layout: 'auto',
    headerAlignment: {
      x: 'center',
      y: 'middle',
    },
    contentAlignment: {
      x: 'center',
      y: 'middle',
    },
    data: [
      {
        id: crypto.randomUUID(),
        name: 'Kim',
        age: 23,
      },
      { id: crypto.randomUUID(), name: 'Kwon' },
    ],
    getKey: item => item.id,
  },
} satisfies Meta<typeof Table<DummyDefaultItem | DummyTreeItem>>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    getCell: item => {
      const dummyItem = item as DummyDefaultItem;

      return (
        <>
          <Table.Data>{dummyItem.name}</Table.Data>
          <Table.Data>{dummyItem.age}</Table.Data>
        </>
      );
    },
  },
};

export const Tree: Story = {
  args: {
    data: meta.args.data.map(item => ({
      ...item,
      name: {
        content: item.name,
        memo: `This is memo for ${item.name}`,
      },
    })) as DummyTreeItem[],
    getCell: item => {
      const dummyItem = item as DummyTreeItem;
      const [isActive, setIsActive] = useState<boolean>(false);

      return (
        <>
          <Table.Data>
            <TextButton
              label={dummyItem.name.content}
              variant="secondary"
              iconBefore={{
                content: LuChevronRight,
                className: `${isActive ? 'rotate-90' : ''} transition-transform`,
              }}
              size="sm"
              className="w-full !justify-start"
              onClick={() => setIsActive(prev => !prev)}
            />
            <p
              className={`indent-4 text-sm ${
                isActive &&
                dummyItem.name.memo &&
                dummyItem.name.memo.length > 0
                  ? 'opacity-normal transition-opacity'
                  : 'pointer-events-none h-0 opacity-0'
              }`}
            >
              {dummyItem.name.memo}
            </p>
          </Table.Data>
          <Table.Data>{dummyItem.age}</Table.Data>
        </>
      );
    },
  },
};
