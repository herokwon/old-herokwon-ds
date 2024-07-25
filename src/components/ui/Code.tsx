import type { Children } from '../../types';

interface CodeProps extends React.ComponentPropsWithoutRef<'code'> {
  children: Children;
}

export default function Code({ children, ...props }: CodeProps) {
  return (
    <code
      {...props}
      className={`inline rounded-ms bg-light-secondary px-0.5 dark:bg-dark-secondary ${props.className ?? ''}`}
    >
      {children}
    </code>
  );
}
