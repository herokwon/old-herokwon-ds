import { FaCircleExclamation } from "react-icons/fa6";

import type { InputProps } from "@/types";

interface InputMessageProps extends Pick<InputProps, 'helperMessage' | 'errorMessage'> {
    hasError: boolean;
}

export default function InputMessage({ hasError, helperMessage, errorMessage }: InputMessageProps) {
    return (
        <p className={`w-full flex items-center text-xs font-semibold ${errorMessage ?
            'text-red' :
            'opacity-normal'} whitespace-pre-wrap`}>
            {hasError &&
                <FaCircleExclamation className="mr-1" />}
            {errorMessage ?? helperMessage}
        </p>
    );
}