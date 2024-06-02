import type { IconType } from "react-icons";

import { ALIGNMENT_X, ALIGNMENT_Y, ELEMENT_BASE_SIZE, ELEMENT_BASE_VARIANT, ELEMENT_EXTENDED_SIZE, ELEMENT_EXTENDED_VARIANT, ELEMENT_SPACING } from "@/data/constant";

export type ElementBaseSize = typeof ELEMENT_BASE_SIZE[number];
export type ElementExtendedSize = typeof ELEMENT_EXTENDED_SIZE[number];
export type ElementSpacing = typeof ELEMENT_SPACING[number];
export type ElementBaseVariant = typeof ELEMENT_BASE_VARIANT[number];
export type ElementExtendedVariant = typeof ELEMENT_EXTENDED_VARIANT[number];

export interface ElementStates {
    isDisabled?: boolean;
    isSelected?: boolean;
    isLoading?: boolean;
};

export type AlignmentX = typeof ALIGNMENT_X[number];
export type AlignmentY = typeof ALIGNMENT_Y[number];
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
    items: ContentWithId[];
};

export * from "./form/input";
export * from "./ui/button";
export * from "./ui/dropdown";