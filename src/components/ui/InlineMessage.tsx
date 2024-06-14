import { useMemo } from "react";

import type { ElementBaseSize, FeedbackVariant } from "@/types";
import { FEEDBACK_ICONS } from "@/data/constant";

interface InlineMessageProps extends React.ComponentPropsWithoutRef<'div'> {
    heading?: string;
    message: string;
    variant?: FeedbackVariant;
    size?: ElementBaseSize;
};

export default function InlineMessage({ heading, message, variant = 'default', size = 'md', ...props }: InlineMessageProps) {
    const FeedbackIcon = useMemo(() => FEEDBACK_ICONS[variant], [variant]);

    return (
        <div {...props} className={`inline-message--${variant} w-full flex ${size === 'lg' ?
            'text-lg' :
            size === 'sm' ?
                'text-sm' :
                'text-base'} !bg-transparent`}>
            <div className={`w-max ${size === 'lg' ?
                'h-[1.125rem] my-[0.3125rem]' :
                size === 'sm' ?
                    'h-[0.875rem] my-[0.1875rem]' :
                    'h-[1rem] my-1'} aspect-square ${size === 'sm' ?
                        'mr-1.5' :
                        'mr-2'} flex justify-center items-center`}>
                <FeedbackIcon />
            </div>
            <div className="w-full">
                {heading &&
                    <p className="w-full font-semibold whitespace-pre">
                        {heading}
                    </p>}
                <p className={`w-full ${!heading ?
                    '' :
                    `${size === 'lg' ?
                        'text-base' :
                        size === 'sm' ?
                            'text-xs' :
                            'text-sm'} opacity-normal`} whitespace-pre`}>
                    {message}
                </p>
            </div>
        </div>
    );
}