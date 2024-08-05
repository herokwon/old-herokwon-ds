import Image from 'next/image';

import EmptyDataImg from '../../assets/empty_data.png';

type EmptyDataProps = Pick<
  React.ComponentPropsWithoutRef<typeof Image>,
  | 'width'
  | 'height'
  | 'fill'
  | 'sizes'
  | 'loading'
  | 'unoptimized'
  | 'onLoad'
  | 'className'
  | 'style'
>;

export default function EmptyData({
  width,
  height,
  fill = false,
  sizes,
  loading,
  unoptimized = false,
  className,
  style,
  onLoad,
}: EmptyDataProps) {
  return (
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
      className={`object-cover object-center opacity-bold dark:opacity-normal ${className ?? ''}`}
      style={style}
      alt="empty-data"
    />
  );
}
