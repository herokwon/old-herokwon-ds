import type {
  AlignmentX,
  AlignmentY,
  Children,
  ElementBaseSize,
  ElementDirection,
} from '../../types';

interface TimelineItem {
  label?: Children;
  content: Children;
}

type TimelineProps = React.ComponentPropsWithoutRef<'div'> & {
  size?: ElementBaseSize;
  items: TimelineItem[];
} & (
    | {
        direction: Extract<ElementDirection, 'vertical'>;
        alignX?: AlignmentX | 'center-alternative';
      }
    | {
        direction: Extract<ElementDirection, 'horizontal'>;
        alignY?: AlignmentY | 'middle-alternative';
      }
  );

const ContentLine = ({ direction }: Pick<TimelineProps, 'direction'>) => {
  return (
    <svg
      className={`stroke-light-tertiary dark:stroke-dark-tertiary ${
        direction === 'vertical' ? 'h-1 w-50' : 'h-25 w-1'
      }`}
    >
      {direction === 'vertical' ? (
        <line x1={0} y1="50%" x2="100%" y2="50%" />
      ) : (
        <line x1="50%" y1={0} x2="50%" y2="100%" />
      )}
    </svg>
  );
};

export default function Timeline({
  size = 'md',
  items,
  ...props
}: TimelineProps) {
  const radius = size === 'lg' ? 6 : size === 'sm' ? 4 : 5;
  const direction = props.direction;
  const restProps = Object.fromEntries(
    Object.entries(props).filter(
      prop => prop[0] !== 'direction' && !prop[0].includes('align'),
    ),
  );

  return (
    <div
      {...restProps}
      className={`relative flex ${
        direction === 'vertical'
          ? `flex-col ${
              !props.alignX || props.alignX.includes('center')
                ? 'gap-y-12'
                : 'gap-y-8'
            }`
          : 'flex-row gap-x-4'
      } ${restProps.className ?? ''}`}
    >
      <svg
        className={`${
          direction === 'vertical'
            ? `top-0 h-full w-2 ${
                props.alignX === 'left'
                  ? `left-0`
                  : props.alignX === 'right'
                    ? 'right-0'
                    : 'left-1/2 -translate-x-1/2'
              }`
            : `left-0 h-2 w-full ${
                props.alignY === 'top'
                  ? 'top-0'
                  : props.alignY === 'bottom'
                    ? 'bottom-0'
                    : 'top-1/2 -translate-y-1/2'
              }`
        } absolute stroke-light-blue dark:stroke-dark-blue`}
        style={{
          margin:
            direction === 'vertical'
              ? !props.alignX || props.alignX?.includes('center')
                ? undefined
                : `0 ${radius - 2 / 2}px`
              : !props.alignY || props.alignY.includes('middle')
                ? undefined
                : `${radius - 2 / 2}px 0`,
        }}
      >
        {direction === 'vertical' ? (
          <line x1="50%" x2="50%" y2="100%" strokeWidth={2} />
        ) : (
          <line x2="100%" y1="50%" y2="50%" strokeWidth={2} />
        )}
      </svg>
      {items.map(({ label, content }, index) => (
        <li
          key={`${label}-${content}-${index}`}
          className={`grid ${
            size === 'lg' ? 'text-lg' : size === 'sm' ? 'text-sm' : 'text-base'
          } ${
            direction === 'vertical'
              ? `${
                  props.alignX === 'left'
                    ? 'grid-cols-[max-content_1fr]'
                    : props.alignX === 'right'
                      ? 'grid-cols-[1fr_max-content]'
                      : 'grid-cols-[1fr_max-content_1fr] items-center'
                }`
              : `justify-items-center ${
                  props.alignY === 'top'
                    ? 'grid-rows-[max-content_1fr]'
                    : props.alignY === 'bottom'
                      ? 'grid-rows-[1fr_max-content]'
                      : 'grid-rows-[1fr_max-content_1fr] items-center'
                }`
          }`}
        >
          <div
            className={`w-fit ${
              direction === 'vertical'
                ? `flex ${
                    size === 'lg'
                      ? 'h-[1.75rem]'
                      : size === 'sm'
                        ? 'h-xl'
                        : 'h-[1.5rem]'
                  } items-center justify-center ${
                    props.alignX === 'left' ? 'order-1' : 'order-2'
                  }`
                : props.alignY === 'top'
                  ? 'order-1'
                  : 'order-2'
            }`}
          >
            <svg
              width={radius * 2}
              height={radius * 2}
              className={`fill-light-blue dark:fill-dark-blue`}
            >
              <circle cx={radius} cy={radius} r={radius} />
            </svg>
          </div>
          {(direction === 'vertical' &&
            (props.alignX === 'left' || props.alignX === 'right')) ||
          (direction === 'horizontal' &&
            (props.alignY === 'top' || props.alignY === 'bottom')) ? (
            <div
              className={`flex ${
                size === 'lg'
                  ? 'gap-3.5'
                  : size === 'sm'
                    ? 'gap-1.5'
                    : 'gap-2.5'
              } ${
                direction === 'vertical'
                  ? props.alignX === 'left'
                    ? 'order-2 flex-row'
                    : 'order-1 flex-row-reverse'
                  : props.alignY === 'top'
                    ? 'order-2 flex-col'
                    : 'order-1 flex-col-reverse'
              }`}
            >
              <div
                className={`flex size-max items-center ${
                  direction === 'vertical'
                    ? size === 'lg'
                      ? 'h-[1.75rem]'
                      : size === 'sm'
                        ? 'h-xl'
                        : 'h-[1.5rem]'
                    : 'mx-auto'
                }`}
              >
                <ContentLine direction={direction} />
              </div>
              <div
                className={
                  direction === 'vertical'
                    ? props.alignX === 'left'
                      ? 'text-start'
                      : 'text-end'
                    : 'text-center'
                }
              >
                {label}
                {content}
              </div>
            </div>
          ) : (
            <>
              <div
                className={`m-auto ${
                  direction === 'vertical'
                    ? `${
                        props.alignX === 'center-alternative' && index % 2 > 0
                          ? `order-3 text-start ${
                              size === 'lg'
                                ? 'ml-3.5'
                                : size === 'sm'
                                  ? 'ml-1.5'
                                  : 'ml-2.5'
                            }`
                          : `order-1 text-end ${
                              size === 'lg'
                                ? 'mr-3.5'
                                : size === 'sm'
                                  ? 'mr-1.5'
                                  : 'mr-2.5'
                            }`
                      }`
                    : `text-center ${
                        props.alignY === 'middle-alternative' && index % 2 > 0
                          ? `order-3 ${
                              size === 'lg'
                                ? 'mt-3.5'
                                : size === 'sm'
                                  ? 'mt-1.5'
                                  : 'mt-2.5'
                            }`
                          : `order-1 ${
                              size === 'lg'
                                ? 'mb-3.5'
                                : size === 'sm'
                                  ? 'mb-1.5'
                                  : 'mb-2.5'
                            }`
                      }`
                }`}
              >
                {label}
              </div>
              <div
                className={`flex ${
                  size === 'lg'
                    ? 'gap-3.5'
                    : size === 'sm'
                      ? 'gap-1.5'
                      : 'gap-2.5'
                } ${
                  direction === 'vertical'
                    ? props.alignX === 'center-alternative' && index % 2 > 0
                      ? 'order-1 flex-row-reverse text-end'
                      : 'order-3 flex-row text-start'
                    : `text-center ${
                        props.alignY === 'middle-alternative' && index % 2 > 0
                          ? 'order-1 flex-col-reverse'
                          : 'order-3 flex-col'
                      }`
                }`}
              >
                <div
                  className={`flex size-max items-center ${
                    direction === 'vertical'
                      ? size === 'lg'
                        ? 'h-[1.75rem]'
                        : size === 'sm'
                          ? 'h-xl'
                          : 'h-[1.5rem]'
                      : 'mx-auto'
                  }`}
                >
                  <ContentLine direction={direction} />
                </div>
                {content}
              </div>
            </>
          )}
        </li>
      ))}
    </div>
  );
}
