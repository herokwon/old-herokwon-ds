import { forwardRef } from "react";

import type { AlignmentX, ElementBaseSize } from "../../types";
import TextButton from "./TextButton";

interface TabItem {
    index: number;
    heading: string;
    content: React.ReactNode;
};

interface TabsProps extends React.ComponentPropsWithoutRef<'div'> {
    size?: ElementBaseSize;
    alignX?: AlignmentX;
    tabItems: TabItem[];
    selectedIndex: number;
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
};

const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs({ size = 'sm', alignX = 'left', tabItems, selectedIndex, setSelectedIndex, ...props }, ref) {
    return (
        <div
            {...props}
            ref={ref}
            className={`w-full ${props.className ?? ''}`}>
            <div className={`w-full flex ${alignX === 'left' ?
                'justify-start' :
                alignX === 'right' ?
                    'justify-end' :
                    'justify-center'} items-center relative after:w-full after:h-2 after:rounded-full after:content-[''] after:bg-light-secondary after:dark:bg-dark-secondary after:absolute after:top-full after:left-0 after:z-0`}>
                {tabItems.map((tabItem) =>
                    <TextButton
                        key={tabItem.index}
                        label={tabItem.heading}
                        variant='secondary'
                        size={size}
                        onClick={() => setSelectedIndex(tabItem.index)}
                        className={`hover:!bg-transparent ${tabItem.index === selectedIndex ?
                            'text-light-blue dark:text-dark-blue' :
                            'text-light/off dark:text-dark/off hover:text-light/normal dark:hover:text-dark/normal'} font-semibold transition-colors relative after:w-full after:h-2 after:rounded-full after:content-[""] ${tabItem.index === selectedIndex ?
                                'after:bg-light-blue after:dark:bg-dark-blue' :
                                'after:bg-transparent hover:after:bg-black/off dark:hover:after:bg-white/off'} after:transition-colors after:absolute after:top-full after:left-0 after:z-[1]`} />)}
            </div>
            <div className="w-full my-4">
                {tabItems.find((tabItem) => tabItem.index === selectedIndex)?.content}
            </div>
        </div>
    );
});

export default Tabs;