import InlineMessage from './InlineMessage';

type BannerProps = Omit<
  React.ComponentPropsWithoutRef<typeof InlineMessage>,
  'heading'
>;

export default function Banner({
  message,
  variant = 'default',
  size = 'md',
  ...props
}: BannerProps) {
  return (
    <InlineMessage
      {...props}
      message={message}
      variant={variant}
      size={size}
      className="banner rounded-ms px-3 py-1.5"
    />
  );
}
