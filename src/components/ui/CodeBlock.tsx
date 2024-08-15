import * as Prism from 'prismjs';
import { Fragment, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { LuCopy } from 'react-icons/lu';

import { CODE_LANGUAGES } from '../../data/constant';

import Box from '../Box';
import IconButton from './IconButton';

type CodeLanguages = (typeof CODE_LANGUAGES)[number];

interface CodeBlockProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onCopy'> {
  isDuplicable?: boolean;
  isHidable?: boolean;
  showLineNumbers?: boolean;
  language?: CodeLanguages;
  code: string;
  label?: string;
  firstLineNumber?: number;
  hidableFirstNumber?: number;
  highlights?: number[];
  onCopy?: () => void;
  onCopyError?: (error: unknown) => void;
}

export default function CodeBlock({
  language,
  code,
  label = language?.toUpperCase() ?? '',
  firstLineNumber = 1,
  hidableFirstNumber = 11,
  highlights = [],
  onCopy,
  onCopyError,
  ...props
}: CodeBlockProps) {
  const {
    isDuplicable = true,
    isHidable = false,
    showLineNumbers = true,
    ...restProps
  } = props;
  const hasHeaderBar = label || isDuplicable;
  const lineNumbers =
    code.length === 0 ? 0 : (code.match(/\n/g)?.length ?? 0) + 1;

  useEffect(() => {
    try {
      if (language === 'tsx') {
        require('prismjs/components/prism-typescript');
        require('prismjs/components/prism-jsx');
        require('prismjs/components/prism-tsx');
      } else require(`prismjs/components/prism-${language}`);
      Prism.highlightAll();
    } catch (error: unknown) {
      console.error(error);
    }
  }, [language, code]);

  return (
    code.length > 0 && (
      <Box as={hasHeaderBar || isHidable ? 'div' : Fragment} className="w-full">
        {hasHeaderBar && (
          <div
            className={`flex h-36 w-full items-end ${
              !label && isDuplicable ? 'justify-end' : 'justify-between'
            } px-1 py-1`}
          >
            {label.length > 0 && (
              <p className="p-0.5 text-sm font-semibold opacity-normal">
                {label}
              </p>
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
          className={`relative w-full overflow-hidden rounded-ms group ${restProps.className ?? ''}`}
        >
          <pre
            className={`flex bg-dark-tertiary x-scrollbar ${
              isHidable
                ? `group-[.showing]:!max-h-max group-[:not(.showing)]:overflow-hidden group-[:not(.showing)]:bg-transparent`
                : ''
            }`}
            style={{
              maxHeight: isHidable
                ? `${0.5 * 2 + 1.5 * (hidableFirstNumber - 1)}rem`
                : undefined,
            }}
          >
            {showLineNumbers && (
              <div
                tabIndex={-1}
                className={`pointer-events-none ${showLineNumbers ? 'bg-dark-tertiary px-2.5 py-2 text-dark' : ''} flex w-fit flex-col items-end`}
              >
                {Array.from({ length: lineNumbers }, (_, i) => {
                  const lineNumber = firstLineNumber + i;

                  return (
                    <Fragment key={i}>
                      {showLineNumbers && <span>{lineNumber}</span>}
                      {highlights.includes(lineNumber) && (
                        <div
                          className="absolute left-0 z-[1] w-full bg-light-primary/15"
                          style={{
                            height: `calc((100% - (0.5rem * 2)) / ${lineNumbers})`,
                            top: `calc(0.5rem + (1.5rem * ${i}))`,
                          }}
                        />
                      )}
                    </Fragment>
                  );
                })}
              </div>
            )}
            <code
              className={`language-${language} ${isHidable ? 'group-[.showing]:pb-8' : ''}`}
            >
              {code}
            </code>
          </pre>
          {isHidable && (
            <IconButton
              icon={FaChevronDown}
              variant="secondary"
              shape="square"
              className="absolute bottom-0 left-1/2 z-0 w-full -translate-x-1/2 rounded-t-none bg-gradient-to-b from-transparent to-dark-primary py-1 text-dark transition-colors only:*:transition-transform hover:!bg-transparent group-[.showing]:mb-2 group-[.showing]:bg-none group-[.showing]:only:*:rotate-180 hover:group-[.showing]:!bg-dark-tertiary/off"
              onClick={e =>
                e.currentTarget.parentElement?.classList.toggle('showing')
              }
            />
          )}
        </div>
      </Box>
    )
  );
}
