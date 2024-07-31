import type { Meta, StoryObj } from '@storybook/react';

import Breadcrumbs from './Breadcrumbs';

const meta = {
  title: 'Components/Breadcrumbs',
  tags: ['autodocs'],
  component: Breadcrumbs,
  args: {
    pathname: 'components/ui/breadcrumb',
    size: 'md',
  },
} satisfies Meta<typeof Breadcrumbs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
