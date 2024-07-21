import Image from 'next/image';

import EmptyImage from '../../assets/empty.png';

type EmptyProps = Partial<
  Pick<React.ComponentPropsWithoutRef<typeof Image>, 'src'>
> &
  Omit<React.ComponentPropsWithoutRef<typeof Image>, 'src' | 'alt'>;

export default function Empty({ ...props }: EmptyProps) {
  return (
    <Image
      {...props}
      src={props.src || EmptyImage}
      width={props.width ?? props.src ? undefined : 128}
      height={props.height ?? props.src ? undefined : 128}
      priority={props.priority || true}
      className={`m-10 opacity-normal dark:opacity-off ${props.className ?? ''}`}
      alt="empty-image"
    />
  );
}
