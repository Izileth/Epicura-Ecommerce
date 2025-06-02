import React from 'react';


interface ContainerProps<T extends React.ElementType = 'div'> {
    as?: T;
    children: React.ReactNode;
    className?: string;
}

type ContainerPropsWithElement<T extends React.ElementType> = 
  ContainerProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof ContainerProps>;

function Container<T extends React.ElementType = 'div'>({
    as,
    children,
    className = '',
    ...props
    }: ContainerPropsWithElement<T>) {
    const Component = as || 'div';
    
    return (
        <Component className={`container ${className}`} {...props}>
        {children}
        </Component>
    );
}


export default Container