import type { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const LayoutComponent: React.FC<LayoutProps> = ({ children }) => (
    <div className="layout">
        <main className="content">{children}</main>
    </div>
);

export default LayoutComponent;
