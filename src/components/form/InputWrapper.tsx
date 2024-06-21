interface InputWrapperProps extends React.ComponentPropsWithoutRef<'div'> {
    children: React.ReactNode;
    isFocused: boolean;
    hasError: boolean;
};

export default function InputWrapper({ children, isFocused, hasError, ...props }: InputWrapperProps) {
    return (
        <div {...props} className={`w-full flex items-center rounded-ms border ${isFocused ?
            (hasError ?
                'border-light-red dark:border-dark-red' :
                'border-light-blue dark:border-dark-blue') :
            'border-light-tertiary dark:border-dark-tertiary'} bg-light-primary dark:bg-dark-secondary overflow-hidden transition-all ${props.className ?? ''}`}>
            {children}
        </div>
    );
}