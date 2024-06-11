import type { ChangeEvent, MouseEvent } from 'react';
import { useEffect, useState } from 'react';

import maLogo from '@/assets/ma.svg';

import Button from '../button/Button.tsx';
import Link from '../link/Link.tsx';

import styles from './header.module.css';

interface HeaderProps {
    cartCount: number;
    onLinkPage: (link: string) => void;
    onFiltersChange: (filters: { search: string; category: string; sort: string }) => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onLinkPage, onFiltersChange }) => {
    const [linkState, setLinkState] = useState({
        about: true,
        products: false,
    });

    const [theme, setTheme] = useState('light');
    const [filters, setFilters] = useState({ search: '', category: '', sort: 'highestPrice' });

    useEffect(() => {
        const userPreferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const savedTheme = localStorage.getItem('theme') || userPreferredTheme;
        setTheme(savedTheme);
        document.documentElement.className = savedTheme;
    }, []);

    const handleThemeToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.className = newTheme;
    };

    const handleLinkClick = (link: string) => {
        setLinkState((previousState) => ({
            ...previousState,
            [link]: true,
            [link === 'about' ? 'products' : 'about']: false,
        }));
        onLinkPage(link);
    };

    const handleFilterChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        onFiltersChange(newFilters);
    };

    const handleCategoryClick = (category: string, event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const newFilters = { ...filters, category };
        setFilters(newFilters);
        onFiltersChange(newFilters);
    };

    return (
        <section className={styles['head']}>
            <div className={styles['head_container']}>
                <div className={styles['head__wrapper-first']}>
                    <div className={styles['head__logo']}>
                        <Link to="https://www.mastersacademy.education/" className={styles['head__logo-ma']}>
                            <img src={maLogo} alt="Masters Academy logo" className={styles['head__logo-ma--link']} />
                        </Link>
                    </div>

                    <div className={styles['head__theme']}>
                        <Button
                            onClick={handleThemeToggle}
                            className={`${styles['head__theme--sun']} ${theme === 'light' ? styles['active'] : ''}`}
                        >
                            <i className="bx bx-sun"></i>
                        </Button>
                        <Button
                            onClick={handleThemeToggle}
                            className={`${styles['head__theme--moon']} ${theme === 'dark' ? styles['active'] : ''}`}
                        >
                            <i className="bx bx-moon"></i>
                        </Button>
                    </div>
                </div>

                <div className={styles['head__wrapper-second']}>
                    <div className={styles['head__navigation']}>
                        <Link
                            to="/fe-react-2024"
                            className={`${styles['head__navigation--link']} ${linkState.about ? styles['active'] : ''}`}
                            onClick={(event) => handleLinkClick('about')}
                        >
                            About
                        </Link>
                        <Link
                            to="/products"
                            className={`${styles['head__navigation--link']} ${linkState.products ? styles['active'] : ''}`}
                            onClick={(event) => handleLinkClick('products')}
                        >
                            Products
                        </Link>
                    </div>

                    <div className={styles['head__cart']}>
                        <Button className={styles['head__cart--button']}>
                            <i className="bx bx-cart"></i>
                            {cartCount > 0 && <span className={styles['cart__count-head']}>{cartCount}</span>}
                        </Button>
                    </div>

                    <div className={styles['head__registration']}>
                        <Button className={styles['head__registration--log']}>
                            <i className="bx bx-log-in"></i>
                            Login
                        </Button>
                        <Button className={styles['head__registration--sign']}>
                            <i className="bx bx-user-plus"></i>
                            Sign up
                        </Button>
                    </div>

                    <div className={styles['head--humburger']}></div>
                </div>
            </div>

            {linkState.products && (
                <div className={styles['head_filters']}>
                    <form className={styles['products__filters']}>
                        <div className={styles['products__filters-search']}>
                            <input
                                className={styles['filters__search-input']}
                                placeholder="Search..."
                                type="search"
                                id="search"
                                name="search"
                                value={filters.search}
                                onChange={handleFilterChange}
                            />
                            <label className={styles['filters__search-icon']} htmlFor="search">
                                <i className="bx bx-search"></i>
                            </label>
                        </div>
                        <div className={styles['products__filters-staff']}>
                            <Button
                                className={`${styles['filters--electronics']} ${filters.category === 'Electronics' ? styles['active'] : ''}`}
                                onClick={(event) => handleCategoryClick('Electronics', event)}
                            >
                                Electronics
                            </Button>
                            <Button
                                className={`${styles['filters--shoes']} ${filters.category === 'Shoes' ? styles['active'] : ''}`}
                                onClick={(event) => handleCategoryClick('Shoes', event)}
                            >
                                Shoes
                            </Button>
                            <Button
                                className={`${styles['filters--clothes']} ${filters.category === 'Clothes' ? styles['active'] : ''}`}
                                onClick={(event) => handleCategoryClick('Clothes', event)}
                            >
                                Clothes
                            </Button>
                        </div>
                        <div className={styles['products__filters-sort']}>
                            <label htmlFor="sort">Sort by:</label>
                            <select
                                data-type="select"
                                title="type"
                                name="sort"
                                id="sort"
                                value={filters.sort}
                                onChange={handleFilterChange}
                            >
                                <option value="highestPrice">Price (High - Low)</option>
                                <option value="lowestPrice">Price (Low - High)</option>
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                            </select>
                        </div>
                    </form>
                </div>
            )}
        </section>
    );
};
