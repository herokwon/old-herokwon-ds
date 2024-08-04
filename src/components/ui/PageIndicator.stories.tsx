import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import PageIndicator from './PageIndicator';

type PageIndicatorProps = {
  defaultSelectedPage?: number;
} & React.ComponentPropsWithoutRef<typeof PageIndicator>;

const meta = {
  title: 'Components/PageIndicator',
  tags: ['autodocs'],
  component: PageIndicator,
  args: {
    totalPage: 3,
    size: 'md',
    shape: 'circle',
  },
} satisfies Meta<typeof PageIndicator>;
export default meta;

type Story = StoryObj<typeof PageIndicator>;

const PageIndicatorRender = ({
  defaultSelectedPage,
  ...props
}: PageIndicatorProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <PageIndicator
      {...props}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
    />
  );
};

export const Default: Story = {
  render: ({ ...props }) => <PageIndicatorRender {...props} />,
};

export const SquareBorder: Story = {
  args: {
    shape: 'square',
  },
  render: ({ ...props }) => <PageIndicatorRender {...props} />,
};
