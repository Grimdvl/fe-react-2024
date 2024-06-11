import type { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const LayoutComponent: React.FC<LayoutProps> = ({ children }) => <main className="content">{children}</main>;

export default LayoutComponent;
