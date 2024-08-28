import type { Meta, StoryObj } from '@storybook/react';
import dynamic from 'next/dynamic';
import { highlightAll } from 'prismjs';
import { useEffect } from 'react';

import { CODE_LANGUAGES } from '../../data/constants';

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
}`,
  },
  argTypes: {
    language: {
      control: 'select',
      options: [...CODE_LANGUAGES].sort(),
    },
  },
} satisfies Meta<typeof CodeBlock>;
export default meta;

type Story = StoryObj<typeof CodeBlock>;

const CodeBlockComponent = dynamic(() =>
  import('prismjs').then(() => CodeBlock),
);

const CodeBlockRender = ({
  language,
  code,
  ...props
}: React.ComponentPropsWithoutRef<typeof CodeBlock>) => {
  useEffect(() => {
    try {
      if (language === 'tsx') {
        require('prismjs/components/prism-typescript');
        require('prismjs/components/prism-jsx');
        require('prismjs/components/prism-tsx');
      } else require(`prismjs/components/prism-${language}`);
      highlightAll();
    } catch (error: unknown) {
      console.error(error);
    }
  }, [language, code]);

  return <CodeBlockComponent language={language} code={code} {...props} />;
};

export const Default: Story = {
  render: ({ ...props }) => <CodeBlockRender {...props} />,
};

export const Highlight: Story = {
  args: {
    highlights: [9],
  },
  render: ({ ...props }) => <CodeBlockRender {...props} />,
};

export const Label: Story = {
  args: {
    label: 'example.tsx',
  },
  render: ({ ...props }) => <CodeBlockRender {...props} />,
};

export const FirstLineNumber: Story = {
  args: {
    showLineNumbers: true,
    firstLineNumber: 100,
    highlights: [108],
  },
  render: ({ ...props }) => <CodeBlockRender {...props} />,
};

export const Hidable: Story = {
  args: {
    isHidable: true,
    hidableFirstNumber: 11,
  },
  render: ({ ...props }) => <CodeBlockRender {...props} />,
};
