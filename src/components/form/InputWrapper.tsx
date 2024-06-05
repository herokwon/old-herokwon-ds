interface InputWrapperProps extends React.ComponentPropsWithoutRef<'div'> {
    children: React.ReactNode;
    isFocused: boolean;
    hasError: boolean;
};

export default function InputWrapper({ children, isFocused, hasError, ...props }: InputWrapperProps) {
    return (
        <div {...props} className={`w-full flex items-center rounded-ms border ${isFocused ?
            (hasError ?
                'border-red' :
                'border-blue') :
            'border-tertiary'} bg-light-primary dark:bg-dark-secondary overflow-hidden transition-all ${props.className ?? ''}`}>
            {children}
        </div>
    );
}