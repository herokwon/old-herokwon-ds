import type { ElementStates } from '..';
import {
  DATETIME_INPUTS,
  SELECTING_INPUTS,
  TEXT_INPUTS,
} from '../../data/constant';

export type InputElement = HTMLInputElement | HTMLTextAreaElement;

export type SelectingInput = (typeof SELECTING_INPUTS)[number];
export type TextInput = (typeof TEXT_INPUTS)[number];
export type DatetimeInput = (typeof DATETIME_INPUTS)[number];

interface InputBaseProps
  extends Pick<ElementStates, 'isDisabled'>,
    Omit<React.ComponentPropsWithoutRef<'input'>, 'type'> {
  label?: string;
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
