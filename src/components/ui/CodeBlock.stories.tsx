import type { Meta, StoryObj } from '@storybook/react';

import CodeBlock from './CodeBlock';

const meta = {
  title: 'Components/CodeBlock',
  tags: ['autodocs'],
  component: CodeBlock,
  args: {
    showLanguageLabel: false,
    showLineNumbers: false,
    isDuplicable: false,
    className: 'max-w-[600px]',
    language: 'jsx',
    content: `import CodeBlock from "./CodeBlock";
    
export default function CodeBlockExample({ children }: { children: React.ReactNode }) {
    return (
        <CodeBlock language="tsx">
            {children}
        </CodeBlock>
    );
}
`,
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

export const LanguageLabel: Story = {
  args: {
    showLanguageLabel: true,
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
