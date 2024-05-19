interface ButtonProps {
    className: string;
    onClick?: () => void;
    children: React.ReactNode;
}

const Buttons: React.FC<ButtonProps> = ({ className, onClick, children }) => (
    <button className={className} onClick={onClick}>
        {children}
    </button>
);

export default Buttons;
