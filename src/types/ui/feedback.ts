import type { ContentWithId, ElementBaseVariant } from '../../types';

import { FEEDBACK_VARIANTS } from '../../data/constants';

import TextButton from '../../components/ui/TextButton';

export type FeedbackVariant = (typeof FEEDBACK_VARIANTS)[number];
export type FeedbackAction = Pick<ContentWithId, 'id'> &
  Pick<
    React.ComponentPropsWithoutRef<typeof TextButton>,
    'isDisabled' | 'label' | 'href' | 'iconBefore' | 'iconAfter' | 'onClick'
  > & {
    variant?: Exclude<ElementBaseVariant, 'default'>;
  };
