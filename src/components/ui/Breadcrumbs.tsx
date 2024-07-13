import Link from 'next/link';

import type { ElementBaseSize } from '../../types';

interface BreadcrumbsProps {
  path: string;
  size?: ElementBaseSize;
}

export default function Breadcrumbs({ path, size = 'md' }: BreadcrumbsProps) {
  const paths = !path.includes('/') ? [] : path.split('/');

  return (
    <nav className="w-full">
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
              className="px-1 underline-offset-2 opacity-off hover:underline hover:opacity-bold"
            >
              {path}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
