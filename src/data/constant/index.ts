import type { IconType } from "react-icons";
import { FaCircleCheck, FaCircleExclamation, FaCircleInfo, FaCommentDots, FaTriangleExclamation } from "react-icons/fa6";

import type { ElementExtendedSize, FeedbackVariant, Months } from "../../types";

export const ELEMENT_BASE_SIZES = ['sm', 'md', 'lg'] as const;
export const ELEMENT_EXTENDED_SIZES = ['xs', ...ELEMENT_BASE_SIZES, 'xl'] as const;
export const ELEMENT_SPACINGS = ['default', 'compact', 'none'] as const;
export const ELEMENT_BASE_VARIANTS = ['default', 'primary', 'secondary'] as const
export const ELEMENT_EXTENDED_VARIANTS = [...ELEMENT_BASE_VARIANTS, 'warning', 'danger'] as const;
export const ELEMENT_DIRECTIONS = ['horizontal', 'vertical'] as const;

export const ELEMENT_TYPES = [
    'a', 'abbr', 'address', 'animate', 'animateMotion', 'animateTransform', 'area', 'article', 'aside', 'audio',
    'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button',
    'canvas', 'caption', 'center', 'circle', 'cite', 'clipPath', 'code', 'col', 'colgroup',
    'data', 'datalist', 'dd', 'defs', 'del', 'desc', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt',
    'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood',
    'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight',
    'feTile', 'feTurbulence', 'fieldset', 'figcaption', 'figure', 'filter', 'footer', 'foreignObject', 'form',
    'ellipse', 'em', 'embed',
    'g',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html',
    'i', 'iframe', 'image', 'img', 'input', 'ins',
    'kbd', 'keygen',
    'label', 'legend', 'li', 'line', 'linearGradient', 'link',
    'main', 'map', 'mark', 'marker', 'mask', 'menu', 'menuitem', 'meta', 'metadata', 'meter', 'mpath',
    'nav', 'noindex', 'noscript',
    'object', 'ol', 'optgroup', 'option', 'output',
    'p', 'param', 'path', 'pattern', 'picture', 'polygon', 'polyline', 'pre', 'progress',
    'q',
    'radialGradient', 'rect', 'rp', 'rt', 'ruby',
    's', 'samp', 'script', 'search', 'section', 'select', 'set', 'slot', 'small', 'source', 'span', 'stop', 'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'switch', 'symbol',
    'table', 'tbody', 'td', 'template', 'text', 'textPath', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tspan',
    'u', 'ul', 'use',
    'var', 'video', 'view',
    'wbr', 'webview',
] as const;

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