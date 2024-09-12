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
    isActive &&
    (percent === 0 ? (
      <div
        {...restProps}
        className={`relative h-4 w-full overflow-x-hidden rounded-full bg-light-secondary *:bg-light-blue dark:bg-dark-secondary *:dark:bg-dark-blue ${restProps.className ?? ''}`}
      >
        <span className="absolute left-0 top-0 h-full w-[25%] animate-[progress_1.5s_ease_infinite] rounded-full" />
        <span className="absolute left-0 top-0 h-full w-[25%] animate-[progress_1.5s_ease_infinite_0.08s] rounded-full" />
      </div>
    ) : (
      <div
        {...restProps}
        className={`flex h-fit w-full ${restProps.className ?? ''}`}
      >
        <progress
          value={percent}
          max={100}
          className="h-4 w-full appearance-none overflow-x-hidden rounded-full progress-bar:bg-light-secondary progress-value:rounded-full progress-value:bg-light-blue dark:progress-bar:bg-dark-secondary dark:progress-value:bg-dark-blue"
        />
      </div>
    ))
  );
}
