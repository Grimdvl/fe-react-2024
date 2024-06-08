import Button from '../button/Button';

import styles from './pagination.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const ELLIPSIS = '...';
    const BUTTON_CLASS = styles['pagination--button'];

    const generatePageNumbers = () => {
        const pageNumbers: (number | string)[] = [];

        if (totalPages <= 1) return pageNumbers;

        pageNumbers.push(1);
        if (currentPage > 3) pageNumbers.push(ELLIPSIS);
        if (currentPage > 2) pageNumbers.push(currentPage - 1);
        if (currentPage !== 1 && currentPage !== totalPages) pageNumbers.push(currentPage);
        if (currentPage < totalPages - 1) pageNumbers.push(currentPage + 1);
        if (currentPage < totalPages - 2) pageNumbers.push(ELLIPSIS);
        pageNumbers.push(totalPages);

        return pageNumbers;
    };

    const pageNumbers = generatePageNumbers();

    return (
        <div className={styles['pagination']}>
            <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={BUTTON_CLASS}>
                <i className="bx bx-chevron-left"></i>
            </Button>
            {pageNumbers.map((number, index) => (
                <Button
                    key={index}
                    onClick={() => typeof number === 'number' && onPageChange(number)}
                    disabled={number === currentPage || number === ELLIPSIS}
                    className={BUTTON_CLASS}
                    active={number === currentPage}
                >
                    {number}
                </Button>
            ))}
            <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={BUTTON_CLASS}>
                <i className="bx bx-chevron-right"></i>
            </Button>
        </div>
    );
};

export default Pagination;
