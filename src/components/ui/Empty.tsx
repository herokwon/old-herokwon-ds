import Image from 'next/image';

import EmptyImage from '@public/empty.png';

interface EmptyProps extends React.ComponentPropsWithoutRef<'div'> {
  imgData?: Omit<React.ComponentProps<typeof Image>, 'alt'>;
  message?: string;
}

export default function Empty({ imgData, message, ...props }: EmptyProps) {
  return (
    <div
      {...props}
      className={`p-10 ${!imgData ? '' : 'relative'} ${props.className ?? ''}`}
    >
      <Image
        {...imgData}
        src={imgData?.src ?? EmptyImage}
        width={imgData?.width ?? 128}
        height={imgData?.height ?? 128}
        priority
        className={`aspect-auto opacity-normal dark:opacity-off ${imgData?.className ?? ''}`}
        alt="empty-image"
      />
      <p className="mt-1 w-full text-center font-medium opacity-normal">
        {message}
      </p>
    </div>
  );
}
