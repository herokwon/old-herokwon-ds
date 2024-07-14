import type { ContentWithId } from '..';
import { FEEDBACK_VARIANTS } from '../../data/constant';
import TextButton from '../../components/ui/TextButton';

export type FeedbackVariant = (typeof FEEDBACK_VARIANTS)[number];
export type FeedbackAction = Pick<ContentWithId, 'id'> &
  Pick<
    React.ComponentPropsWithoutRef<typeof TextButton>,
    | 'isDisabled'
    | 'label'
    | 'variant'
    | 'href'
    | 'iconBefore'
    | 'iconAfter'
    | 'onClick'
  >;
