import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';

import maLogo from '@/assets/ma.svg';

import Buttons from '../button/Buttons.tsx';
import Link from '../link/Link.tsx';

import styles from './header.module.css';

interface HeaderProps {
    cartCount: number;
    onLinkPage: (link: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onLinkPage }) => {
    const [linkState, setLinkState] = useState({
        about: true,
        products: false,
    });

    const [theme, setTheme] = useState('light');

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

    const handleLinkClick = (link: string, event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setLinkState({
            ...linkState,
            [link]: true,
            [link === 'about' ? 'products' : 'about']: false,
        });
        onLinkPage(link);
    };

    return (
        <section className={styles['head']}>
            <div className={styles['head_container']}>
                <div className={styles['head__logo']}>
                    <Link href="https://www.mastersacademy.education/" className={styles['head__logo-ma']}>
                        <img src={maLogo} alt="Masters Academy logo" className={styles['head__logo-ma--link']} />
                    </Link>
                </div>

                <div className={styles['head__theme']}>
                    <Buttons
                        onClick={handleThemeToggle}
                        className={`${styles['head__theme--sun']} ${theme === 'light' ? styles['active'] : ''}`}
                    >
                        <i className="bx bx-sun"></i>
                    </Buttons>
                    <Buttons
                        onClick={handleThemeToggle}
                        className={`${styles['head__theme--moon']} ${theme === 'dark' ? styles['active'] : ''}`}
                    >
                        <i className="bx bx-moon"></i>
                    </Buttons>
                </div>

                <div className={styles['head__navigation']}>
                    <Link
                        href="#"
                        className={`${styles['head__navigation--link']} ${linkState.about ? styles['active'] : ''}`}
                        onClick={(event) => handleLinkClick('about', event)}
                    >
                        About
                    </Link>
                    <Link
                        href="#"
                        className={`${styles['head__navigation--link']} ${linkState.products ? styles['active'] : ''}`}
                        onClick={(event) => handleLinkClick('products', event)}
                    >
                        Products
                    </Link>
                </div>

                <div className={styles['head__cart']}>
                    <Buttons className={styles['head__cart--button']}>
                        <i className="bx bx-cart"></i>
                        {cartCount > 0 && <span className={styles['cart__count-head']}>{cartCount}</span>}
                    </Buttons>
                </div>

                <div className={styles['head__registration']}>
                    <Buttons className={styles['head__registration--log']}>
                        <i className="bx bx-log-in"></i>
                        Login
                    </Buttons>
                    <Buttons className={styles['head__registration--sign']}>
                        <i className="bx bx-user-plus"></i>
                        Sign up
                    </Buttons>
                </div>

                <div className={styles['head--humburger']}></div>
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
                            />
                            <label className={styles['filters__search-icon']} htmlFor="search">
                                <i className="bx bx-search"></i>
                            </label>
                        </div>
                        <div className={styles['products__filters-staff']}>
                            <Buttons className={styles['filters--electronics']}>Electronics</Buttons>
                            <Buttons className={styles['filters--shoes']}>Shoes</Buttons>
                            <Buttons className={styles['filters--clothes']}>Clothes</Buttons>
                        </div>
                        <div className={styles['products__filters-sort']}>
                            <label htmlFor="sort">Sort by:</label>
                            <select data-type="select" title="type" name="sort" id="sort">
                                <option value="High" selected>
                                    Price (High - Low)
                                </option>
                                <option value="Low">Price (Low - High)</option>
                                <option value="Newest">Newest</option>
                                <option value="Oldest">Oldest</option>
                            </select>
                        </div>
                    </form>
                </div>
            )}
        </section>
    );
};
