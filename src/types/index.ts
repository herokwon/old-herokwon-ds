import type { IconType } from 'react-icons';

import {
  ELEMENT_BASE_SIZES,
  ELEMENT_BASE_VARIANTS,
  ELEMENT_DIRECTIONS,
  ELEMENT_EXTENDED_SIZES,
  ELEMENT_EXTENDED_VARIANTS,
  ELEMENT_SPACINGS,
} from '../data/constant';
import React from 'react';

// common element types
export type ElementBaseSize = (typeof ELEMENT_BASE_SIZES)[number];
export type ElementExtendedSize = (typeof ELEMENT_EXTENDED_SIZES)[number];
export type ElementSpacing = (typeof ELEMENT_SPACINGS)[number];
export type ElementBaseVariant = (typeof ELEMENT_BASE_VARIANTS)[number];
export type ElementExtendedVariant = (typeof ELEMENT_EXTENDED_VARIANTS)[number];
export type ElementDirection = (typeof ELEMENT_DIRECTIONS)[number];
export interface ElementStates {
  isDisabled?: boolean;
  isSelected?: boolean;
  isLoading?: boolean;
}
export interface ElementWithHref {
  href?: {
    to: string;
    replace?: boolean;
  };
}
type EventHandler<T extends Element> = Omit<
  React.DOMAttributes<T>,
  'children' | 'dangerouslySetInnerHTML'
>;
export type ElementEventHandler<
  T extends Element,
  K extends keyof EventHandler<T> = never,
> = [K] extends [never] ? EventHandler<T> : Pick<EventHandler<T>, K>;

// polymorphic element types
type AsProp<T extends React.ElementType> = {
  as?: T;
};
export type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>['ref'];
export type PolymorphicElementPropsWithoutRef<
  T extends React.ElementType,
  Props = {},
> = AsProp<T> & Props & React.ComponentPropsWithoutRef<T>;
export type PolymorphicElementPropsWithRef<
  T extends React.ElementType,
  Props = {},
> = PolymorphicElementPropsWithoutRef<T, Props> & {
  ref?: PolymorphicRef<T>;
};

// content element types
export interface ContentWithId extends Omit<ElementStates, 'isLoading'> {
  id: string;
  heading: string;
  description?: string;
}
export interface ContentWithIcon {
  iconBefore?: React.ComponentPropsWithoutRef<'svg'> & {
    content?: IconType;
    size?: ElementExtendedSize;
  };
  iconAfter?: ElementEventHandler<SVGElement> & {
    content?: IconType;
    size?: ElementExtendedSize;
  };
}
export interface ItemsWithHeading {
  id: string;
  heading: string;
  items: (ContentWithId & ContentWithIcon)[];
}

export * from './common/datetime';
export * from './common/position';

export * from './form/input';

export * from './ui/button';
export * from './ui/dropdown';
export * from './ui/feedback';
