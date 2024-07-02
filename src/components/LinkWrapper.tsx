import Link from "next/link";

import type { ElementStates } from "../types";

type LinkWrapperProps =
    Pick<ElementStates, 'isDisabled'> &
    Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> &
    Partial<Pick<React.ComponentPropsWithoutRef<typeof Link>, 'href'>>;

export default function LinkWrapper({ children, href, ...props }: LinkWrapperProps) {
    const { isDisabled = false, ...restProps } = props;

    return !href ?
        children :
        <Link
            {...restProps}
            href={href}
            replace={restProps.replace}
            onClick={(e) => isDisabled &&
                e.preventDefault()}
            className={`${isDisabled ?
                '!cursor-not-allowed *:!pointer-events-none' :
                'hover:text-light-blue dark:hover:text-dark-blue hover:underline underline-offset-2 decoration-light-blue dark:decoration-dark-blue'} ${restProps.className ?? ''}`}>
            {children}
        </Link>
}