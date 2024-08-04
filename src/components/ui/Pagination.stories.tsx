import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Pagination from './Pagination';

type PaginationRenderProps = {
  defaultSelectedPage?: number;
} & React.ComponentPropsWithoutRef<typeof Pagination>;

const meta = {
  title: 'Components/Pagination',
  tags: ['autodocs'],
  component: Pagination,
  args: {
    totalPage: 100,
    pagePerIndex: 5,
    size: 'md',
    shape: 'square',
  },
} satisfies Meta<typeof Pagination>;
export default meta;

type Story = StoryObj<typeof Pagination>;

const PaginationRender = ({
  defaultSelectedPage,
  ...props
}: PaginationRenderProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(
    Math.floor((defaultSelectedPage ?? 1) - 1) ?? 0,
  );

  return (
    <Pagination
      {...props}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
    />
  );
};

export const Default: Story = {
  render: ({ ...props }) => <PaginationRender {...props} />,
};

export const CircleBorder: Story = {
  args: {
    shape: 'circle',
  },
  render: ({ ...props }) => <PaginationRender {...props} />,
};
