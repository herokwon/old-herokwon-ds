import { FaCircleExclamation } from "react-icons/fa6";

import type { InputProps } from "../../types";

interface InputMessageProps extends Pick<InputProps, 'helperMessage' | 'errorMessage'>, React.ComponentPropsWithoutRef<'p'> {
    hasError: boolean;
}

export default function InputMessage({ hasError, helperMessage, errorMessage, ...props }: InputMessageProps) {
    return (
        <p {...props} className={`w-full flex items-center text-xs ${errorMessage ?
            'text-red' :
            'opacity-normal'} whitespace-pre-wrap ${props.className ?? ''}`}>
            {hasError &&
                <FaCircleExclamation className="mr-1" />}
            {errorMessage ?? helperMessage}
        </p>
    );
}