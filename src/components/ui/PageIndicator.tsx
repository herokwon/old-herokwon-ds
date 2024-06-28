import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import type { ElementBaseSize } from "../../types";
import TextButton from "./TextButton";
import IconButton from "./IconButton";

interface PageIndicatorProps extends React.ComponentPropsWithoutRef<'div'> {
    totalPage: number;
    defaultSelectedPage?: number;
    size?: ElementBaseSize;
    prev?: string | IconType;
    next?: string | IconType;
};

const IndicatorRadiusSize: { [size in ElementBaseSize]: number } = {
    lg: 5,
    md: 4,
    sm: 3,
};

export default function PageIndicator({ totalPage, defaultSelectedPage = 1, size = 'md', prev, next, ...props }: PageIndicatorProps) {
    const [selectedIndex, setSelectedIndex] = useState<number>(parseInt(Math.abs(defaultSelectedPage).toFixed(0)) - 1);

    const onClickHandler = {
        prevButton: () => setSelectedIndex((prev) => Math.max(0, prev - 1)),
        nextButton: () => setSelectedIndex((prev) => Math.min(prev + 1, totalPage - 1)),
    };

    useEffect(() => {
        setSelectedIndex(parseInt(Math.abs(defaultSelectedPage).toFixed(0)) - 1);
    }, [defaultSelectedPage]);

    return (
        <div {...props} className={`w-full flex items-center ${props.className ?? ''}`}>
            {typeof prev === 'string' ?
                <TextButton
                    isDisabled={selectedIndex === 0}
                    label={prev}
                    size={size}
                    variant='secondary'
                    spacing='compact'
                    onClick={onClickHandler.prevButton} /> :
                <IconButton
                    isDisabled={selectedIndex === 0}
                    icon={prev ?? LuChevronLeft}
                    size={size}
                    variant='secondary'
                    spacing='compact'
                    shape='square'
                    onClick={onClickHandler.prevButton} />}
            <div className="w-full px-4 flex justify-center items-center gap-x-2">
                {Array.from({ length: totalPage }, (_, i) => i).map((_, index) =>
                    <svg
                        key={index}
                        className={`aspect-square rounded-full ${selectedIndex === index ?
                            '' :
                            'cursor-pointer'} group`}
                        onClick={() => setSelectedIndex(index)}
                        style={{
                            width: `${IndicatorRadiusSize[size] * 2}px`
                        }}>
                        <circle
                            cx={IndicatorRadiusSize[size]}
                            cy={IndicatorRadiusSize[size]}
                            r={IndicatorRadiusSize[size]}
                            className={selectedIndex === index ?
                                'fill-blue-500 dark:fill-blue-600' :
                                'fill-[#e2e8f0] group-hover:fill-[#cbd5e1] dark:fill-[#1e293b] dark:group-hover:fill-[#475569] transition-all'} />
                    </svg>)}
            </div>
            {typeof next === 'string' ?
                <TextButton
                    isDisabled={selectedIndex === totalPage - 1}
                    label={next}
                    size={size}
                    variant='secondary'
                    spacing='compact'
                    onClick={onClickHandler.nextButton} /> :
                <IconButton
                    isDisabled={selectedIndex === totalPage - 1}
                    icon={next ?? LuChevronRight}
                    size={size}
                    variant='secondary'
                    spacing='compact'
                    shape='square'
                    onClick={onClickHandler.nextButton} />}
        </div>
    );
}