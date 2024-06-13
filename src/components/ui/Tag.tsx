import { useEffect, useRef, useState } from "react";
import { LuHash, LuX } from "react-icons/lu";

import type { ElementBaseSize, ElementSpacing } from "@/types";
import TextButton from "./TextButton";

interface TagProps extends Omit<React.ComponentPropsWithoutRef<typeof TextButton>, 'isHoverable' | 'size' | 'spacing'> {
    isRemovable?: boolean;
    size?: Exclude<ElementBaseSize, 'lg'>;
    spacing?: Exclude<ElementSpacing, 'default'>;
};

export default function Tag({ isRemovable = false, ...props }: TagProps) {
    const { size = 'sm', spacing = 'compact', iconBefore = { content: LuHash }, iconAfter, ...restProps } = props;

    const [isRemoved, setIsRemoved] = useState<boolean>(false);
    const tagRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!isRemovable || !tagRef.current || !tagRef.current.lastElementChild) return;
        const removeButton = tagRef.current.lastElementChild as HTMLElement;

        removeButton.onmouseenter = () =>
            tagRef.current?.classList.add('removable');
        removeButton.onmouseleave = () =>
            tagRef.current?.classList.remove('removable');
    }, [isRemovable]);

    return (
        <TextButton
            {...restProps}
            ref={tagRef}
            isHoverable={false}
            size={size}
            spacing={spacing}
            iconBefore={iconBefore}
            iconAfter={isRemovable ?
                {
                    content: LuX,
                    onClick: () => setIsRemoved(true),
                } :
                iconAfter}
            tabIndex={!restProps.href ?
                -1 :
                undefined}
            className={`${isRemoved ?
                'hidden' :
                ''} ${isRemovable ?
                    '!cursor-default last:*:cursor-pointer' :
                    !restProps.href ?
                        '!cursor-default' :
                        ''}`} />
    );
}