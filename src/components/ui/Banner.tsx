import InlineMessage from './InlineMessage';

interface BannerProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof InlineMessage>,
    'heading' | 'message'
  > {
  children: React.ReactNode;
}

export default function Banner({
  children,
  variant = 'default',
  size = 'md',
  ...props
}: BannerProps) {
  return (
    <InlineMessage
      {...props}
      message={children}
      variant={variant}
      size={size}
      className={`banner rounded-ms px-2.5 py-1 ${props.className ?? ''}`}
    />
  );
}
