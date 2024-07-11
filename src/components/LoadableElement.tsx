import type { PolymorphicElementPropsWithRef } from "../types";
import Backdrop from "./ui/Backdrop";
import Spinner from "./ui/Spinner";

type _LoadableElementProps = Pick<React.ComponentPropsWithoutRef<typeof Spinner>, 'size'> & {
    isActive: boolean;
};

type LoadableElementProps<T extends React.ElementType> = PolymorphicElementPropsWithRef<T, _LoadableElementProps>;

export default function LoadableElement<T extends React.ElementType = 'div'>({ children, isActive, as, size = 'md', ...props }: LoadableElementProps<T>) {
    const Element = as || 'div';

    return (
        <Element
            {...props}
            className={`${isActive ?
                'relative first:*:pointer-events-none' :
                ''} ${props.className ?? ''}`}>
            {children}
            <Backdrop
                isActive={isActive}
                className='w-full h-full absolute top-0 bottom-0 left-0 right-0 z-40'>
                <Spinner size={size} />
            </Backdrop>
        </Element>
    );
}