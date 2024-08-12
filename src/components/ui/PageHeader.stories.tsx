import type { Meta, StoryObj } from '@storybook/react';

import Breadcrumbs from './Breadcrumbs';
import PageHeader from './PageHeader';

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
    breadcrumbs: <Breadcrumbs pathname="/components/ui/pageheader" />,
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
