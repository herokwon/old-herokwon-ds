import { CgSpinner } from 'react-icons/cg';

import type { ElementExtendedSize } from '../../types';

import { ICON_SIZE } from '../../data/constant';

interface SpinnerProps
  extends Omit<React.ComponentPropsWithoutRef<'svg'>, 'children'> {
  size?: ElementExtendedSize | number;
}

export default function Spinner({ size = 'md', ...props }: SpinnerProps) {
  return (
    <CgSpinner
      {...props}
      size={typeof size === 'number' ? size : ICON_SIZE[size] * 2.5}
      className={`animate-spin text-light-blue dark:text-dark-blue ${props.className ?? ''}`}
    />
  );
}
