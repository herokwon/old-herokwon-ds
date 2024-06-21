import type { ElementBaseSize, ElementStates } from "../../types";
import Checkbox from "./Checkbox";

interface CheckboxGroupProps extends Pick<ElementStates, 'isSelected'>, React.ComponentPropsWithoutRef<'div'> {
    size?: ElementBaseSize;
    isDependent?: boolean;
    subItems?: React.ComponentProps<typeof Checkbox>[];
};

export default function CheckboxGroup({ size = 'md', subItems = [], ...props }: CheckboxGroupProps) {
    const { isDependent = false, isSelected = false, ...restProps } = props;

    return (
        <div {...restProps} className={`w-full flex flex-col gap-2 ${size === 'lg' ?
            'pl-6' :
            size === 'sm' ?
                'pl-4' :
                'pl-5'} py-2 ${restProps.className ?? ''}`}>
            {subItems.map((subItem) =>
                <Checkbox
                    {...subItem}
                    key={subItem.id}
                    isSelected={isDependent ?
                        isSelected :
                        subItem.isSelected}
                    size={size === 'lg' ?
                        'md' :
                        'sm'} />)}
        </div>
    );
}