import Link from 'next/link';

import type { ElementBaseSize } from '../../types';

interface BreadcrumbsProps extends React.ComponentPropsWithoutRef<'nav'> {
  pathname: string;
  size?: ElementBaseSize;
}

export default function Breadcrumbs({
  pathname,
  size = 'md',
  ...props
}: BreadcrumbsProps) {
  const paths = !pathname.includes('/') ? [] : pathname.split('/');

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
              index + 1 === paths.length
                ? ''
                : 'after:px-1 after:opacity-off after:content-["/"]'
            }`}
          >
            <Link
              href={paths.slice(0, index + 1).join('/')}
              title={paths.slice(0, index + 1).join('/')}
              className={`px-1 opacity-off ${
                paths.at(-1) === path
                  ? 'pointer-events-none'
                  : 'underline-offset-2 hover:underline hover:opacity-bold'
              }`}
            >
              {path}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
