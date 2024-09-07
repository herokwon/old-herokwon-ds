import type { FeedbackVariant } from '../../types/ui';

import { FEEDBACK_ICONS } from '../../data/constants';

import Icon from './Icon';

interface FeedbackIconProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Icon>,
    'icon' | 'spacing'
  > {
  variant: FeedbackVariant;
}

export default function FeedbackIcon({
  variant,
  size = 'md',
  ...props
}: FeedbackIconProps) {
  return (
    <Icon
      {...props}
      icon={FEEDBACK_ICONS[variant]}
      size={size}
      spacing="none"
    />
  );
}
