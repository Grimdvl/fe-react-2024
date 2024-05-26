import type { MouseEvent } from 'react';
import { useState } from 'react';

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
            <div className={styles['head__logo']}>
                <Link href="https://www.mastersacademy.education/" className={styles['head__logo-ma']}>
                    <img src={maLogo} alt="Masters Academy logo" className={styles['head__logo-ma--link']} />
                </Link>
            </div>

            <div className={styles['head__theme']}>
                <Buttons className={styles['head__theme--sun']} active={true}>
                    <i className="bx bx-sun"></i>
                </Buttons>
                <Buttons className={styles['head__theme--moon']}>
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
        </section>
    );
};
