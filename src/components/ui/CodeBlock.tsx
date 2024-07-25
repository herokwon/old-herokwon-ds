import { Fragment, useEffect } from 'react';
import { LuCopy } from 'react-icons/lu';
import { highlightAll } from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';

import type { Children } from '../../types';
import Box from '../Box';
import IconButton from './IconButton';

interface CodeBlockProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'content' | 'onCopy'> {
  isDuplicable?: boolean;
  showLanguageLabel?: boolean;
  showLineNumbers?: boolean;
  language?: string;
  content: Children;
  firstLineNumber?: number;
  highlights?: number[];
  onCopy?: React.ClipboardEventHandler<HTMLButtonElement>;
}

export default function CodeBlock({
  children,
  language,
  content,
  firstLineNumber = 1,
  highlights = [],
  onCopy,
  ...props
}: CodeBlockProps) {
  const {
    isDuplicable = true,
    showLanguageLabel = true,
    showLineNumbers = true,
    ...restProps
  } = props;
  const lineNumbers = content.toString().match(/\n/g)?.length ?? 0;

  useEffect(() => {
    highlightAll();
  }, []);

  return (
    <Box as={showLanguageLabel || isDuplicable ? 'div' : Fragment}>
      <div
        className={`flex w-full items-end ${
          !showLanguageLabel && isDuplicable ? 'justify-end' : 'justify-between'
        } py-0.5`}
      >
        {showLanguageLabel && (
          <p className="py-0.5 text-sm font-semibold">
            {language?.toUpperCase()}
          </p>
        )}
        {isDuplicable && (
          <IconButton
            icon={LuCopy}
            variant="secondary"
            spacing="compact"
            shape="square"
            onCopy={onCopy}
          />
        )}
      </div>
      <div
        {...restProps}
        className={`relative w-full overflow-auto ${restProps.className ?? ''}`}
      >
        <pre
          className="flex h-full !bg-dark-secondary"
          style={{ padding: 0, margin: 0 }}
        >
          <div
            tabIndex={-1}
            className={`pointer-events-none ${showLineNumbers ? 'mr-2 bg-dark-tertiary p-4 pr-2' : ''} flex w-fit flex-col items-end`}
          >
            {Array.from({ length: lineNumbers }, (_, i) => {
              const lineNumber = firstLineNumber + i;

              return (
                <Fragment key={i}>
                  {showLineNumbers && (
                    <span className="highlight-line leading-[1.5]">
                      {lineNumber}
                    </span>
                  )}
                  {highlights.includes(lineNumber) && (
                    <div
                      className="absolute left-0 z-[1] w-full bg-light-primary/15"
                      style={{
                        height: `calc((100% - (1rem * 2)) / ${lineNumbers})`,
                        top: `calc(1rem + ((100% - (1rem * 2)) / ${lineNumbers}) * ${i})`,
                      }}
                    />
                  )}
                </Fragment>
              );
            })}
          </div>
          <code className={`language-${language} p-4`}>{content}</code>
        </pre>
      </div>
    </Box>
  );
}
