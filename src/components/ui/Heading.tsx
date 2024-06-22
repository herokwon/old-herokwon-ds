import Link from "next/link";

import type { ElementType, ElementWithHref, PolymorphicElementPropsWithoutRef } from "../../types";

type HeadingElement = Extract<ElementType, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;

type _HeadingProps = ElementWithHref & {
    content: string;
};

type HeadingProps<T extends HeadingElement> = PolymorphicElementPropsWithoutRef<T, _HeadingProps>;

export default function Heading<T extends HeadingElement = 'h1'>({ as, href, content, ...props }: HeadingProps<T>) {
    const Element = as || 'h1';

    return (
        <Element
            {...props}
            className={`${props.className ?? ''}`}>
            {!href ?
                content :
                <Link
                    href={href.to}
                    replace={href.replace}
                    className="hover:text-light-blue dark:hover:text-dark-blue hover:underline underline-offset-2 decoration-light-blue dark:decoration-dark-blue">
                    {content}
                </Link>}
        </Element>
    );
}