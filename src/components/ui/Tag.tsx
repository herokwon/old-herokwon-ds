import { LuHash } from "react-icons/lu";

import TextButton from "./TextButton";

type TagProps = React.ComponentPropsWithoutRef<typeof TextButton>;

export default function Tag({ label, variant = 'default', size = 'sm', spacing = 'compact', href, iconBefore = { content: LuHash }, iconAfter, ...props }: TagProps) {
    const { isDisabled = false, isSelected = false, isLoading = false, ...restProps } = props;

    return (
        <TextButton
            {...restProps}
            isDisabled={isDisabled}
            isSelected={isSelected}
            isLoading={isLoading}
            label={label}
            variant={variant}
            size={size}
            spacing={spacing}
            href={href}
            iconBefore={iconBefore}
            iconAfter={iconAfter}
            tabIndex={!href ?
                -1 :
                undefined}
            className={!href ?
                'pointer-events-none' :
                ''} />
    );
}