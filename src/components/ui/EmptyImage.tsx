import Image from 'next/image';

import EmptyImageImg from '../../assets/empty_image.png';

type EmptyImageProps = Pick<
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

export default function EmptyImage({
  width,
  height,
  fill = false,
  sizes,
  loading,
  unoptimized = false,
  className,
  style,
  onLoad,
}: EmptyImageProps) {
  return (
    <Image
      src={EmptyImageImg}
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
      alt="empty-image"
    />
  );
}
