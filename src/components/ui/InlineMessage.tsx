import { useMemo } from "react";

import type { ElementBaseSize, FeedbackVariant } from "@/types";
import { FEEDBACK_ICONS } from "@/data/constant";

interface InlineMessageProps extends React.ComponentPropsWithoutRef<'div'> {
    heading?: string;
    message: React.ReactNode;
    variant?: FeedbackVariant;
    size?: ElementBaseSize;
};

export default function InlineMessage({ children, heading, message, variant = 'default', size = 'md', ...props }: InlineMessageProps) {
    const FeedbackIcon = useMemo(() => FEEDBACK_ICONS[variant], [variant]);

    return (
        <div {...props} className={`inline-message--${variant} w-full flex ${size === 'lg' ?
            'text-lg' :
            size === 'sm' ?
                'text-sm' :
                'text-base'} bg-transparent ${props.className ?? ''}`}>
            <div className={`w-max h-full ${heading ?
                (size === 'lg' ?
                    'my-[0.3125rem]' :
                    size === 'sm' ?
                        'my-[0.1875rem]' :
                        'my-1') :
                (size === 'lg' ?
                    'my-1' :
                    size === 'sm' ?
                        'my-[0.125rem]' :
                        'my-[0.1875rem]')} ${size === 'sm' ?
                            'mr-1.5' :
                            'mr-2'}`}>
                <FeedbackIcon className={size === 'lg' ?
                    'h-[1.125rem]' :
                    size === 'sm' ?
                        'h-[0.875rem]' :
                        'h-[1rem]'} />
            </div>
            <div className="w-full flex flex-col justify-center">
                {heading &&
                    <p className="w-full font-semibold whitespace-pre">
                        {heading}
                    </p>}
                <p className={`w-full ${size === 'lg' ?
                    'text-base' :
                    size === 'sm' ?
                        'text-xs' :
                        'text-sm'} ${heading ?
                            'opacity-normal' :
                            ''} whitespace-pre`}>
                    {message}
                </p>
                {children}
            </div>
        </div>
    );
}