import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    active?: boolean;
}

const Buttons: React.FC<ButtonProps> = ({ children, className, active, ...props }) => (
    <button className={`${className} ${active ? 'active' : ''}`} {...props}>
        {children}
    </button>
);

export default Buttons;
