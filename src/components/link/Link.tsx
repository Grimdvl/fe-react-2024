import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Link = ({ to, children, className, ...restProps }: React.ComponentProps<typeof RouterLink> & { className?: string }) => (
    <RouterLink to={to} className={className} {...restProps}>
        {children}
    </RouterLink>
);

export default Link;
