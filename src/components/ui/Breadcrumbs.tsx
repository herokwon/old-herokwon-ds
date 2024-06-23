import Link from "next/link";

import type { ElementBaseSize } from "../../types";

interface BreadcrumbsProps {
    path: string;
    size?: ElementBaseSize;
};

export default function Breadcrumbs({ path, size = 'md' }: BreadcrumbsProps) {
    const paths = !path.includes('/') ?
        [] :
        path.split('/');

    return (
        <nav className="w-full">
            <ol className={`w-full flex items-center ${size === 'lg' ?
                'tex-base' :
                size === 'sm' ?
                    'text-xs' :
                    'text-sm'}`}>
                {paths.map((path, index) =>
                    <li key={index} className={`${index + 1 === paths.length ?
                        '' :
                        'after:px-1 after:content-["/"] after:opacity-normal'}`}>
                        <Link
                            href={paths.slice(0, index + 1).join('/')}
                            title={paths.slice(0, index + 1).join('/')}
                            className="px-1 opacity-normal hover:opacity-bold hover:underline underline-offset-2">
                            {path}
                        </Link>
                    </li>)}
            </ol>
        </nav>
    );
}