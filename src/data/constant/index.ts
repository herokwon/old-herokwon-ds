import type { IconType } from "react-icons";
import { FaCircleCheck, FaCircleExclamation, FaCircleInfo, FaCommentDots, FaTriangleExclamation } from "react-icons/fa6";

import type { ElementExtendedSize, FeedbackVariant, Months } from "@/types";

export const ELEMENT_BASE_SIZES = ['sm', 'md', 'lg'] as const;
export const ELEMENT_EXTENDED_SIZES = ['xs', ...ELEMENT_BASE_SIZES, 'xl'] as const;
export const ELEMENT_SPACINGS = ['default', 'compact', 'none'] as const;
export const ELEMENT_BASE_VARIANTS = ['default', 'primary', 'secondary'] as const
export const ELEMENT_EXTENDED_VARIANTS = [...ELEMENT_BASE_VARIANTS, 'warning', 'danger'] as const;
export const ELEMENT_DIRECTIONS = ['horizontal', 'vertical'] as const;

export const FEEDBACK_VARIANTS = ['default', 'success', 'info', 'warning', 'danger'] as const;

export const ALIGNMENTS_X = ['left', 'center', 'right'] as const;
export const ALIGNMENTS_Y = ['top', 'middle', 'bottom'] as const;

export const SELECTING_INPUTS = ['text', 'multi-text', 'radio', 'checkbox'] as const;
export const TEXT_INPUTS = ['email', 'number', 'password', 'search', 'tel', 'text', 'url'] as const;
export const DATETIME_INPUTS = ['date', 'datetime-local', 'month', 'time', 'week'] as const;

export const CALENDAR_FORMS = ['daily', 'weekly', 'monthly', 'yearly'] as const;
export const MONTHS: Months[] = new Proxy([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], {
    get(target, prop, receiver) {
        if (!isNaN(Number(prop)) && Number(prop) < 0) {
            prop = `${Number(prop) + target.length}`;
        }

        if (!isNaN(Number(prop)) && Number(prop) >= target.length) {
            prop = `${Number(prop) % target.length}`;
        }

        return Reflect.get(target, prop, receiver);
    }
});

export const ICON_SIZE: { [size in ElementExtendedSize]: number } = {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
};

export const FEEDBACK_ICONS: { [variant in FeedbackVariant]: IconType } = {
    default: FaCommentDots,
    success: FaCircleCheck,
    info: FaCircleInfo,
    warning: FaTriangleExclamation,
    danger: FaCircleExclamation,
};