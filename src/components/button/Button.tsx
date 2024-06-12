import styles from './button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    active?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, className, active, ...props }) => (
    <button className={`${styles.button} ${className} ${active ? styles['active'] : ''}`} {...props}>
        {children}
    </button>
);

export default Button;
