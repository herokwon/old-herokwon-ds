import type { Meta, StoryObj } from '@storybook/react';

import PageHeader from './PageHeader';
import Breadcrumbs from './Breadcrumbs';

const meta = {
  title: 'Components/PageHeader',
  tags: ['autodocs'],
  component: PageHeader,
  args: {
    children: 'Page Header',
  },
} satisfies Meta<typeof PageHeader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBreadcrumbs: Story = {
  args: {
    breadcrumbs: <Breadcrumbs path="components/ui/pageheader" />,
  },
};

export const Linkable: Story = {
  args: {
    href: {
      to: '/#',
      replace: false,
    },
  },
};
