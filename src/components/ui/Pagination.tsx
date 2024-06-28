import { useEffect, useState } from "react";
import { LuChevronFirst, LuChevronLast, LuChevronLeft, LuChevronRight } from "react-icons/lu";

import type { ElementBaseSize } from "../../types";
import IconButton from "./IconButton";
import TextButton from "./TextButton";

interface PaginationProps extends React.ComponentPropsWithoutRef<'div'> {
    totalPage: number;
    pagePerIndex?: number;
    defaultSelectedPage?: number;
    size?: ElementBaseSize;
};

export default function Pagination({ totalPage, pagePerIndex = 5, defaultSelectedPage = 1, size = 'md', ...props }: PaginationProps) {
    const [viewedIndex, setViewedIndex] = useState<number>(Math.floor((parseInt(Math.abs(defaultSelectedPage).toFixed(0)) - 1) / pagePerIndex));
    const [selectedIndex, setSelectedIndex] = useState<number>(parseInt(Math.abs(defaultSelectedPage).toFixed(0)) - 1);

    const onClickHandler = {
        firstButton: () => setSelectedIndex(0),
        prevButton: () => setSelectedIndex((prev) => Math.max(0, prev - pagePerIndex)),
        nextButton: () => setSelectedIndex((prev) => Math.min(prev + pagePerIndex, totalPage - 1)),
        lastButton: () => setSelectedIndex(totalPage - 1),
    };

    useEffect(() => {
        setSelectedIndex(parseInt(Math.abs(defaultSelectedPage).toFixed(0)) - 1);
    }, [defaultSelectedPage]);

    useEffect(() => {
        setViewedIndex(Math.floor(selectedIndex / pagePerIndex));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedIndex]);

    return (
        <div {...props} className={`w-full flex items-center gap-x-1 ${props.className ?? ''}`}>
            <IconButton
                isDisabled={viewedIndex === 0}
                icon={LuChevronFirst}
                size={size}
                shape='square'
                onClick={onClickHandler.firstButton} />
            <IconButton
                isDisabled={viewedIndex === 0}
                icon={LuChevronLeft}
                size={size}
                shape='square'
                onClick={onClickHandler.prevButton} />
            <div className="w-full h-full grid grid-flow-col items-center gap-x-1">
                {Array.from({ length: Math.min(totalPage - (viewedIndex * pagePerIndex), pagePerIndex) }, (_, i) => i).map((_, i) => {
                    const pageIndex = (viewedIndex * pagePerIndex) + i;
                    const pageNumberLength = (pageIndex + 1).toString().length;

                    return (
                        <TextButton
                            key={pageIndex}
                            label={`${pageIndex + 1}`}
                            variant={pageIndex === selectedIndex ?
                                'primary' :
                                'secondary'}
                            size={size}
                            isSelected={pageIndex === selectedIndex}
                            onClick={() => setSelectedIndex(pageIndex)}
                            className={`${size === 'lg' ?
                                'w-[2.25rem]' :
                                size === 'sm' ?
                                    'w-[1.75rem]' :
                                    'w-[2rem]'} aspect-square whitespace-nowrap`}
                            style={{
                                letterSpacing: `-${pageNumberLength * 0.03}rem`
                            }} />
                    );
                })}
            </div>
            <IconButton
                isDisabled={viewedIndex === Math.floor((totalPage - 1) / pagePerIndex)}
                icon={LuChevronRight}
                size={size}
                shape='square'
                onClick={onClickHandler.nextButton} />
            <IconButton
                isDisabled={viewedIndex === Math.floor((totalPage - 1) / pagePerIndex)}
                icon={LuChevronLast}
                size={size}
                shape='square'
                onClick={onClickHandler.lastButton} />
        </div>
    );
}