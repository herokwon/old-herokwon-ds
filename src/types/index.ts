import { ELEMENT_BASE_SIZE, ELEMENT_BASE_VARIANT, ELEMENT_EXTENDED_SIZE, ELEMENT_EXTENDED_VARIANT, ELEMENT_SPACING } from "@/data/constant";

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

export * from "./ui/button";