import type { Meta, StoryObj } from '@storybook/react';

import { CODE_LANGUAGES } from '../../data/constant';

import CodeBlock from './CodeBlock';

const meta = {
  title: 'Components/CodeBlock',
  tags: ['autodocs'],
  component: CodeBlock,
  args: {
    isDuplicable: true,
    isHidable: false,
    showLineNumbers: true,
    language: 'tsx',
    className: 'max-w-[600px]',
    code: `import CodeBlock from "./CodeBlock";

interface CodeBlockProps {
    code: string;
};

export default function CodeBlockExample({ code }: CodeBlockProps) {
    return (
        <CodeBlock language="tsx" code={code} />
    );
}
`,
  },
  argTypes: {
    language: {
      control: 'select',
      options: [...CODE_LANGUAGES].sort(),
    },
  },
} satisfies Meta<typeof CodeBlock>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Highlight: Story = {
  args: {
    highlights: [9],
  },
};

export const Label: Story = {
  args: {
    label: 'example.tsx',
  },
};

export const LineNumbers: Story = {
  args: {
    showLineNumbers: true,
  },
};

export const FirstLineNumber: Story = {
  args: {
    showLineNumbers: true,
    firstLineNumber: 100,
    highlights: [108],
  },
};

export const Hidable: Story = {
  args: {
    isHidable: true,
    hidableFirstNumber: 5,
  },
};
