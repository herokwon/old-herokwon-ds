import { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import ProgressBar from './ProgressBar';

const meta = {
  title: 'Components/ProgressBar',
  tags: ['autodocs'],
  component: ProgressBar,
  args: {
    isActive: true,
    className: 'min-w-[300px]',
  },
} satisfies Meta<typeof ProgressBar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Percent: StoryObj<typeof ProgressBar> = {
  render: ({ ...props }) => {
    const [percent, setPercent] = useState<number>(0);
    const percentRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      if (!percentRef.current)
        percentRef.current = setInterval(() => {
          setPercent(prev => prev + 1);
        }, 25);
    }, []);

    useEffect(() => {
      if (percentRef.current && percent >= 100) {
        clearInterval(percentRef.current);
        percentRef.current = null;
      }
    }, [percent]);

    return <ProgressBar {...props} percent={percent} />;
  },
};
