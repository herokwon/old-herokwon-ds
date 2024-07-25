interface ProgressBarProps extends React.ComponentPropsWithoutRef<'div'> {
  isActive?: boolean;
  percent?: number;
}

export default function ProgressBar({
  percent = 0,
  ...props
}: ProgressBarProps) {
  const { isActive = false, ...restProps } = props;

  return (
    isActive && (
      <div
        {...restProps}
        className={`relative h-5 w-full overflow-x-hidden rounded-full bg-light-secondary *:bg-light-blue dark:bg-dark-secondary *:dark:bg-dark-blue ${restProps.className ?? ''}`}
      >
        {percent > 0 ? (
          <span
            className="absolute left-0 top-0 h-full w-full origin-left rounded-full transition-transform"
            style={{
              transform: `scaleX(${percent}%)`,
            }}
          />
        ) : (
          <>
            <span className="absolute left-0 top-0 h-full w-[25%] animate-[progress_1.5s_ease_infinite] rounded-full" />
            <span className="absolute left-0 top-0 h-full w-[25%] animate-[progress_1.5s_ease_infinite_0.08s] rounded-full" />
          </>
        )}
      </div>
    )
  );
}
