import Image from 'next/image';

import EmptyImage from '@public/empty.png';

interface EmptyProps extends React.ComponentPropsWithoutRef<'div'> {
  imgData?: Omit<React.ComponentProps<typeof Image>, 'alt'>;
  message?: string;
}

export default function Empty({ imgData, message, ...props }: EmptyProps) {
  const hasImgSrc =
    imgData?.src !== undefined && imgData.src.toString().length > 0;

  return (
    <div
      {...props}
      className={`m-12 flex items-center justify-center ${!imgData ? '' : 'relative'} ${props.className ?? ''}`}
    >
      <Image
        {...imgData}
        src={imgData?.src ?? EmptyImage}
        fill={hasImgSrc}
        width={imgData?.width ?? (hasImgSrc ? undefined : 128)}
        height={imgData?.height ?? (hasImgSrc ? undefined : 128)}
        priority
        placeholder={imgData?.placeholder ?? (hasImgSrc ? 'empty' : 'blur')}
        className={`${
          hasImgSrc ? 'object-center' : ''
        } opacity-normal dark:opacity-off ${imgData?.className ?? ''}`}
        alt="empty-image"
      />
      {message && message.length > 0 && (
        <p className="mt-1 w-full text-center font-medium opacity-normal">
          {message}
        </p>
      )}
    </div>
  );
}
