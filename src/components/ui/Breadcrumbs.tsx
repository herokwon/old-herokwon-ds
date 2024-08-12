import Link from 'next/link';

import type { ElementBaseSize } from '../../types';

interface BreadcrumbsProps extends React.ComponentPropsWithoutRef<'nav'> {
  pathname: string;
  size?: ElementBaseSize;
  customHeading?: {
    [key: string]: string;
  };
}

export default function Breadcrumbs({
  pathname,
  size = 'md',
  customHeading = {},
  ...props
}: BreadcrumbsProps) {
  const paths =
    !pathname.includes('/') || pathname.length === 0
      ? []
      : pathname
          .slice(pathname.indexOf('/') + 1, pathname.lastIndexOf('/'))
          .split('/');

  return (
    <nav {...props} className={`w-full ${props.className ?? ''}`}>
      <ol
        className={`flex w-full items-center ${
          size === 'lg' ? 'tex-base' : size === 'sm' ? 'text-xs' : 'text-sm'
        }`}
      >
        {paths.map((path, index) => (
          <li
            key={index}
            className={`${
              paths.at(-1) !== path
                ? 'after:px-1 after:opacity-off after:content-["/"]'
                : ''
            }`}
          >
            <Link
              href={paths.slice(0, index + 1).join('/')}
              title={paths.slice(0, index + 1).join('/')}
              className="px-1 underline-offset-2 opacity-off hover:underline hover:opacity-bold"
            >
              {path in customHeading ? customHeading[path] : path}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
