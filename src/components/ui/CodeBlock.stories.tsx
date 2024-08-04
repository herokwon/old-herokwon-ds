import type { Meta, StoryObj } from '@storybook/react';

import { CODE_LANGUAGES } from '../../data/constant';

import CodeBlock from './CodeBlock';

const meta = {
  title: 'Components/CodeBlock',
  tags: ['autodocs'],
  component: CodeBlock,
  args: {
    isDuplicable: false,
    showLineNumbers: false,
    language: 'tsx',
    className: 'max-w-[600px]',
    code: `import CodeBlock from "./CodeBlock";
    
export default function CodeBlockExample({ code }: { code: React.ReactNode }) {
    return (
        <CodeBlock language="tsx">
            {code}
        </CodeBlock>
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

export const Default: Story = {
  args: {
    showLineNumbers: false,
  },
};

export const Highlight: Story = {
  args: {
    highlights: [5, 6, 7],
  },
};

export const Label: Story = {
  args: {
    label: 'example.tsx',
  },
};

export const Dulicable: Story = {
  args: {
    isDuplicable: true,
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
    highlights: [101, 102],
  },
};
