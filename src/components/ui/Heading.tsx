import type { ElementType, ElementWithHref, PolymorphicElementPropsWithoutRef } from "../../types";
import LinkWrapper from "../LinkWrapper";

type HeadingElement = Extract<ElementType, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;

type _HeadingProps = ElementWithHref & {
    content: string;
};

type HeadingProps<T extends HeadingElement> = PolymorphicElementPropsWithoutRef<T, _HeadingProps>;

export default function Heading<T extends HeadingElement = 'h1'>({ children, as, href, content, ...props }: HeadingProps<T>) {
    const Element = as || 'h1';

    return (
        <Element
            {...props}
            className={`${props.className ?? ''}`}>
            <p>
                <LinkWrapper
                    href={href?.to}
                    replace={href?.replace}
                    className="hover:underline underline-offset-2">
                    {content}
                </LinkWrapper>
            </p>
            {children}
        </Element>
    );
}