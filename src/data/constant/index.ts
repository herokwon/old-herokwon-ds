import type { ElementExtendedSize } from "@/types";

export const ELEMENT_BASE_SIZE = ['sm', 'md', 'lg'] as const;
export const ELEMENT_EXTENDED_SIZE = ['xs', ...ELEMENT_BASE_SIZE, 'xl'] as const;
export const ELEMENT_SPACING = ['default', 'compact', 'none'] as const;
export const ELEMENT_BASE_VARIANT = ['default', 'primary', 'secondary'] as const
export const ELEMENT_EXTENDED_VARIANT = [...ELEMENT_BASE_VARIANT, 'warning', 'danger'] as const;

export const ALIGNMENT_X = ['left', 'center', 'right'] as const;
export const ALIGNMENT_Y = ['top', 'middle', 'bottom'] as const;

export const SELECTING_INPUT = ['text', 'multi-text', 'radio', 'checkbox'] as const;
export const TEXT_INPUT = ['email', 'number', 'password', 'search', 'tel', 'text', 'url'] as const;
export const DATETIME_INPUT = ['date', 'datetime-local', 'month', 'time', 'week'] as const;

export const ICON_SIZE: { [size in ElementExtendedSize]: number } = {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
};