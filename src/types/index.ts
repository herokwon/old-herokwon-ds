import type { IconType } from "react-icons";

import {
    ALIGNMENTS_X,
    ALIGNMENTS_Y,
    ELEMENT_BASE_SIZES,
    ELEMENT_BASE_VARIANTS,
    ELEMENT_DIRECTIONS,
    ELEMENT_EXTENDED_SIZES,
    ELEMENT_EXTENDED_VARIANTS,
    ELEMENT_SPACINGS
} from "@/data/constant";

export type ElementBaseSize = typeof ELEMENT_BASE_SIZES[number];
export type ElementExtendedSize = typeof ELEMENT_EXTENDED_SIZES[number];
export type ElementSpacing = typeof ELEMENT_SPACINGS[number];
export type ElementBaseVariant = typeof ELEMENT_BASE_VARIANTS[number];
export type ElementExtendedVariant = typeof ELEMENT_EXTENDED_VARIANTS[number];
export type ElementDirection = typeof ELEMENT_DIRECTIONS[number];

export interface ElementStates {
    isDisabled?: boolean;
    isSelected?: boolean;
    isLoading?: boolean;
};

export type AlignmentX = typeof ALIGNMENTS_X[number];
export type AlignmentY = typeof ALIGNMENTS_Y[number];
export type AbsolutePositionX = `${Exclude<AlignmentX, 'center'>}-${AlignmentY}`;
export type AbsolutePositionY = `${Exclude<AlignmentY, 'middle'>}-${AlignmentX}`;

export type AbsolutePosition = AbsolutePositionX | AbsolutePositionY;

export interface ContentWithId extends Omit<ElementStates, 'isLoading'> {
    id: string;
    heading: string;
    description?: string;
};

export interface ContentWithIcon {
    iconBefore?: {
        content: IconType;
        size?: ElementExtendedSize;
    };
    iconAfter?: {
        content: IconType;
        size?: ElementExtendedSize;
    }
};

export interface ItemsWithHeading {
    id: string;
    heading: string;
    items: (ContentWithId & ContentWithIcon)[];
};

export * from "./datetime";
export * from "./form/input";
export * from "./ui/button";
export * from "./ui/dropdown";