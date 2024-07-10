import { useRouter } from "next/navigation";

import type { ElementWithHref, PolymorphicElementPropsWithRef } from "../types";

type LinkableElementProps<T extends React.ElementType> = PolymorphicElementPropsWithRef<T, ElementWithHref>;

export default function LinkableElement<T extends React.ElementType = 'div'>({ children, as, href, ...props }: LinkableElementProps<T>) {
    const Element = as || 'div';

    const { push, replace } = useRouter();

    return (
        <Element
            {...props}
            className={`${href ?
                'linkable' :
                ''} ${props.className ?? ''}`}
            onClick={(e) => {
                props.onClick && props.onClick(e);
                href && (
                    href.replace ?
                        replace(href.to) :
                        push(href.to)
                );
            }}>
            {children}
        </Element>
    );
}