import { forwardRef, useState } from "react";

import type { AlignmentX } from "../../types";
import TextButton from "./TextButton";

interface TabItem {
    id: string;
    tabName: string;
    tabContent: React.ReactNode;
};

interface TabsProps extends React.ComponentPropsWithoutRef<'div'> {
    alignX?: AlignmentX;
    tabItems: TabItem[];
};

const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs({ alignX = 'left', tabItems, ...props }, ref) {
    const [selectedTabItem, setSelectedTabItem] = useState<TabItem | null>(tabItems.length === 0 ?
        null :
        tabItems[0]);

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
                {tabItems.map((tabItem, index) =>
                    <TextButton
                        key={index}
                        label={tabItem.tabName}
                        variant='secondary'
                        size='sm'
                        onClick={() => setSelectedTabItem(tabItem)}
                        className={`hover:!bg-transparent ${selectedTabItem?.id === tabItem.id ?
                            'text-light-blue dark:text-dark-blue' :
                            'text-light/off dark:text-dark/off hover:text-light/normal dark:hover:text-dark/normal'} font-semibold transition-colors relative after:w-full after:h-2 after:rounded-full after:content-[""] ${selectedTabItem?.id === tabItem.id ?
                                'after:bg-light-blue after:dark:bg-dark-blue' :
                                'after:bg-transparent hover:after:bg-black/off dark:hover:after:bg-white/off'} after:transition-colors after:absolute after:top-full after:left-0 after:z-[1]`} />)}
            </div>
            <div className="w-full my-4">
                {selectedTabItem?.tabContent}
            </div>
        </div>
    );
});

export default Tabs;