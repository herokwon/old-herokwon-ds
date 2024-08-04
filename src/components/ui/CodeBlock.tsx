import * as Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.min.css';
import { Fragment, useEffect } from 'react';
import { LuCopy } from 'react-icons/lu';

import { CODE_LANGUAGES } from '../../data/constant';
import '../../data/prism';

import Box from '../Box';
import IconButton from './IconButton';

type CodeLanguages = (typeof CODE_LANGUAGES)[number];

interface CodeBlockProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onCopy'> {
  isDuplicable?: boolean;
  showLineNumbers?: boolean;
  language?: CodeLanguages;
  code: string;
  label?: string;
  firstLineNumber?: number;
  highlights?: number[];
  onCopy?: () => void;
  onCopyError?: (error: unknown) => void;
}

const CodeBlock = ({
  children,
  language,
  code,
  label = language?.toUpperCase() ?? '',
  firstLineNumber = 1,
  highlights = [],
  onCopy,
  onCopyError,
  ...props
}: CodeBlockProps) => {
  const { isDuplicable = true, showLineNumbers = true, ...restProps } = props;
  const hasHeaderBar = label || isDuplicable;
  const lineNumbers = code.match(/\n/g)?.length ?? 0;

  useEffect(() => {
    import(`prismjs/components/prism-${language}`)
      .then(() => Prism.highlightAll())
      .catch((error: unknown) => console.error(error));
  }, [language]);

  return (
    <Box as={hasHeaderBar ? 'div' : Fragment}>
      {hasHeaderBar && (
        <div
          className={`flex h-36 w-full items-center rounded-t-ms bg-dark-tertiary ${
            !label && isDuplicable ? 'justify-end' : 'justify-between'
          } px-1 py-1`}
        >
          {label.length > 0 && (
            <p className="p-0.5 text-sm font-semibold">{label}</p>
          )}
          {isDuplicable && (
            <IconButton
              icon={LuCopy}
              variant="secondary"
              spacing="compact"
              shape="square"
              onClick={async () => {
                await navigator.clipboard
                  .writeText(code)
                  .then(() => onCopy?.())
                  .catch((error: unknown) => onCopyError?.(error));
              }}
            />
          )}
        </div>
      )}
      <div
        {...restProps}
        className={`relative w-full overflow-auto ${restProps.className ?? ''}`}
      >
        <pre
          className={`flex h-full ${
            hasHeaderBar ? '!rounded-t-none' : ''
          } !bg-dark-secondary`}
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
          <code className={`language-${language} p-4`}>{code}</code>
        </pre>
      </div>
    </Box>
  );
};

export default CodeBlock;
