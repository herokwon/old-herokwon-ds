import Image from 'next/image';

import EmptyDataImg from '../../assets/empty_data.png';

type EmptyDataProps = Pick<
  React.ComponentPropsWithoutRef<typeof Image>,
  'width' | 'height' | 'fill' | 'sizes' | 'loading' | 'unoptimized' | 'onLoad'
> &
  Omit<React.ComponentPropsWithoutRef<'div'>, 'onLoad'> & {
    emptyMessage?: string;
  };

export default function EmptyData({
  width,
  height,
  fill = false,
  sizes,
  loading,
  unoptimized = false,
  onLoad,
  emptyMessage = '',
  ...props
}: EmptyDataProps) {
  return (
    <div
      {...props}
      className={`flex w-fit flex-col items-center gap-2 ${props.className ?? ''}`}
    >
      <Image
        src={EmptyDataImg}
        priority
        fill={fill}
        sizes={fill ? sizes : undefined}
        width={fill ? undefined : width ?? 100}
        height={fill ? undefined : height ?? 100}
        loading={loading}
        unoptimized={unoptimized}
        onLoad={onLoad}
        className="object-cover object-center opacity-bold dark:opacity-normal"
        alt="empty-data"
      />
      {emptyMessage.length > 0 && (
        <p className="w-full whitespace-pre text-center opacity-normal">
          {emptyMessage}
        </p>
      )}
    </div>
  );
}
