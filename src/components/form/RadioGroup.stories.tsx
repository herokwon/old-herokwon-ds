import type { Meta, StoryObj } from '@storybook/react';

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

export const Default: Story = {
  render: ({ ...props }) => {
    const dummyItems: InputContent[] = Array.from({ length: 3 }, (_, i) => ({
      id: crypto.randomUUID(),
      label: `Radio Item ${i + 1}`,
      description:
        i === 2 ? `This is a description for Radio Item ${i + 1}` : undefined,
    }));

    return (
      <RadioGroup {...props} defaultSelectedId={dummyItems[0].id}>
        {dummyItems.map(dummyItem => (
          <Radio key={dummyItem.id} {...dummyItem} />
        ))}
      </RadioGroup>
    );
  },
};
