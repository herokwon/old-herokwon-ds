import type { ElementStates } from "..";
import { DATETIME_INPUT, SELECTING_INPUT, TEXT_INPUT } from "@/data/constant";

export type InputElement = HTMLInputElement | HTMLTextAreaElement;

export type SelectingInput = typeof SELECTING_INPUT[number];
export type TextInput = typeof TEXT_INPUT[number];
export type DatetimeInput = typeof DATETIME_INPUT[number];

interface InputBaseProps extends Pick<ElementStates, 'isDisabled'>, Omit<React.ComponentPropsWithoutRef<'input'>, 'type'> {
    label?: string;
    helperMessage?: string;
    errorMessage?: string;
};

export type InputProps<T extends TextInput | DatetimeInput = never> = ([T] extends [never] ?
    InputBaseProps :
    InputBaseProps &
    {
        type?: T;
    });