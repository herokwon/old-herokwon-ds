import { FaStar } from "react-icons/fa6";

import type { InputProps } from "../../types";
import { useInput } from "../../hooks";

type InputHeaderProps =
    Pick<InputProps, 'label' | 'id' | 'maxLength' | 'required'> &
    Pick<ReturnType<typeof useInput>, 'currentInputLength'>;

export default function InputHeader({ label, id, required, maxLength, currentInputLength }: InputHeaderProps) {
    return (
        <div className={`w-full flex ${!label && maxLength ?
            'justify-end' :
            'justify-between'} items-center`}>
            {label &&
                label.length > 0 &&
                <label htmlFor={id} className={`w-full flex items-center text-xs font-semibold ${id ?
                    'cursor-pointer' :
                    ''} opacity-bold`}>
                    {label}
                    {required &&
                        <FaStar size={8} className="ml-1" />}
                </label>}
            {maxLength &&
                maxLength > 0 &&
                <span className="input-length-label text-[0.625rem] leading-[0.75rem] opacity-off">
                    {`${currentInputLength} / ${maxLength}`}
                </span>}
        </div>
    );
}