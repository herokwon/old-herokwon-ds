import type { IconType } from "react-icons";

import {
    ELEMENT_BASE_SIZES,
    ELEMENT_BASE_VARIANTS,
    ELEMENT_DIRECTIONS,
    ELEMENT_EXTENDED_SIZES,
    ELEMENT_EXTENDED_VARIANTS,
    ELEMENT_SPACINGS,
    ELEMENT_TYPES,
    FEEDBACK_VARIANTS
} from "../data/constant";

export type ElementBaseSize = typeof ELEMENT_BASE_SIZES[number];
export type ElementExtendedSize = typeof ELEMENT_EXTENDED_SIZES[number];
export type ElementSpacing = typeof ELEMENT_SPACINGS[number];
export type ElementBaseVariant = typeof ELEMENT_BASE_VARIANTS[number];
export type ElementExtendedVariant = typeof ELEMENT_EXTENDED_VARIANTS[number];
export type ElementDirection = typeof ELEMENT_DIRECTIONS[number];

export type ElementType = typeof ELEMENT_TYPES[number];

export interface ElementStates {
    isDisabled?: boolean;
    isSelected?: boolean;
    isLoading?: boolean;
};

export interface ElementWithHref {
    href?: {
        to: string;
        replace?: boolean;
    };
};

type AsProp<T extends React.ElementType> = {
    as?: T;
};

export type PolymorphicRef<T extends React.ElementType> =
    React.ComponentPropsWithRef<T>["ref"];

export type PolymorphicElementPropsWithoutRef<
    T extends ElementType,
    Props = {}
> = AsProp<T> &
    Props &
    React.ComponentPropsWithoutRef<T>;

export type PolymorphicElementPropsWithRef<
    T extends ElementType,
    Props = {}
> = PolymorphicElementPropsWithoutRef<T, Props> & {
    ref?: PolymorphicRef<T>;
};

export type FeedbackVariant = typeof FEEDBACK_VARIANTS[number];

export interface ContentWithId extends Omit<ElementStates, 'isLoading'> {
    id: string;
    heading: string;
    description?: string;
};

export interface ContentWithIcon {
    iconBefore?: EventHandler<keyof SVGSVGElementEventMap> & {
        content: IconType;
        size?: ElementExtendedSize;
    };
    iconAfter?: EventHandler<keyof SVGSVGElementEventMap> & {
        content: IconType;
        size?: ElementExtendedSize;
    };
};

export type EventHandler<T extends string> = {
    [H in `on${Capitalize<T>}`]?: (event: React.BaseSyntheticEvent) => void;
};

export interface ItemsWithHeading {
    id: string;
    heading: string;
    items: (ContentWithId & ContentWithIcon)[];
};

export * from "./datetime";
export * from "./position";

export * from "./form/input";

export * from "./ui/button";
export * from "./ui/dropdown";
export * from "./ui/feedback";