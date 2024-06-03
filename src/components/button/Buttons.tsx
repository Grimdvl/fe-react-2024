import styles from './buttons.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    active?: boolean;
}

const Buttons: React.FC<ButtonProps> = ({ children, className, active, ...props }) => (
    <button className={`${className} ${active ? styles['active'] : ''}`} {...props}>
        {children}
    </button>
);

export default Buttons;
