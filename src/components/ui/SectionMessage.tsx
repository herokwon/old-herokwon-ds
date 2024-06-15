import { useMemo, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

import type { FeedbackAction } from "@/types";
import InlineMessage from "./InlineMessage";
import TextButton from "./TextButton";
import IconButton from "./IconButton";

type SectionMessageProps = React.ComponentPropsWithoutRef<typeof InlineMessage> & {
    actions?: FeedbackAction[];
} & ({
    isHidable: true;
    defaultHidden?: boolean;
} | {
    isHidable?: false;
});

export default function SectionMessage({ heading, message, variant = 'default', size = 'md', actions = [], ...props }: SectionMessageProps) {
    const [isHidden, setIsHidden] = useState<boolean>(!(!props.isHidable) && !(!props.defaultHidden));

    const restProps = useMemo(() => ({
        ...Object.entries(props).filter((prop) => prop[0] !== 'isHidable' && prop[0] !== 'defaultHidden')
    }), [props]);

    return (
        <section className={`section-message--${variant} w-full px-4 py-3 border rounded-ms shadow-md shadow-secondary ${props.className ?? ''}`}>
            <div className={`w-full flex ${isHidden ?
                'items-center' :
                'items-start'}`}>
                <InlineMessage
                    {...restProps}
                    heading={heading}
                    message={message}
                    variant={variant}
                    size={size}
                    className={isHidden ?
                        'last:*:line-clamp-1' :
                        ''}>
                    {actions.length > 0 &&
                        <div className="w-full pt-4 pb-1 flex justify-end items-center gap-x-1">
                            {actions.map((action) =>
                                <TextButton
                                    {...action}
                                    key={action.id}
                                    size={size === 'lg' ?
                                        'md' :
                                        'sm'}
                                />)}
                        </div>}
                </InlineMessage>
                {props.isHidable &&
                    <IconButton
                        icon={FaChevronDown}
                        onClick={() => setIsHidden((prev) => !prev)}
                        variant='secondary'
                        size={size === 'lg' ?
                            'md' :
                            size === 'sm' ?
                                'xs' :
                                'sm'}
                        className={`${size === 'sm' ?
                            'ml-1.5' :
                            'ml-2'} ${isHidden ?
                                'opacity-off hover:opacity-normal' :
                                'rotate-180 opacity-normal'} transition-all`} />}
            </div>
        </section>
    );
}