import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { InputContent } from '../../types/form';

import Radio from './Radio';
import RadioGroup from './RadioGroup';

const meta = {
  title: 'Components/RadioGroup',
  tags: ['autodocs'],
  component: RadioGroup,
  args: {
    isDisabled: false,
  },
} satisfies Meta<typeof RadioGroup>;
export default meta;

type Story = StoryObj<typeof RadioGroup>;

const dummyItems: InputContent[] = Array.from({ length: 3 }, (_, i) => ({
  id: crypto.randomUUID(),
  label: `Radio Item ${i + 1}`,
  description:
    i === 2 ? `This is a description for Radio Item ${i + 1}` : undefined,
}));

export const Default: Story = {
  render: ({ ...props }) => {
    const [selectedId, setSelectedId] = useState<string>(dummyItems[0].id);

    return (
      <RadioGroup {...props}>
        {dummyItems.map(({ id, ...dummyItem }) => (
          <Radio
            key={id}
            id={id}
            {...dummyItem}
            isChecked={id === selectedId}
            onChange={checked => checked && setSelectedId(id)}
          />
        ))}
      </RadioGroup>
    );
  },
};
