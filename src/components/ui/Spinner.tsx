import { CgSpinner } from 'react-icons/cg';

import Icon from './Icon';

type SpinnerProps = Omit<
  React.ComponentPropsWithoutRef<typeof Icon>,
  'children' | 'icon' | 'spacing'
>;

export default function Spinner({ size = 'md', ...props }: SpinnerProps) {
  return (
    <Icon
      {...props}
      icon={CgSpinner}
      size={size}
      spacing="none"
      className={`scale-[2] only:*:animate-spin only:*:text-light-blue dark:only:*:text-dark-blue ${props.className ?? ''}`}
    />
  );
}
