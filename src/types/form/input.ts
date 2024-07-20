import type { Children, ContentWithId } from '..';
import {
  DATETIME_INPUTS,
  SELECTING_INPUTS,
  TEXT_INPUTS,
} from '../../data/constant';

export type InputElement = HTMLInputElement | HTMLTextAreaElement;
export type InputContent = Omit<ContentWithId, 'children'> & {
  label: Children;
};

export type SelectingInput = (typeof SELECTING_INPUTS)[number];
export type TextInput = (typeof TEXT_INPUTS)[number];
export type DatetimeInput = (typeof DATETIME_INPUTS)[number];

interface InputBaseProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'type' | 'children'> {
  label?: Children;
  helperMessage?: string;
  errorMessage?: string;
}

export type InputProps<T extends TextInput | DatetimeInput = never> = [
  T,
] extends [never]
  ? InputBaseProps
  : InputBaseProps & {
      type?: T;
    };
