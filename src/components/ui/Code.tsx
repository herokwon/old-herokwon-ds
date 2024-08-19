import type { Children } from '../../types';

interface CodeProps extends React.ComponentPropsWithoutRef<'code'> {
  children: Children;
}

export default function Code({ children, ...props }: CodeProps) {
  return (
    <code
      {...props}
      className={`inline rounded-ms bg-light-tertiary px-0.5 font-medium dark:bg-dark-tertiary ${props.className ?? ''}`}
    >
      {children}
    </code>
  );
}
