import aboutImg from '@/assets/aboutImg.png';

import Link from '../link/Link.tsx';

import styles from './about.module.css';

const aboutDescrTextClass = styles['about__descr-text'];

export const About = () => (
    <section className={styles['about']}>
        <div className={styles['about__descr']}>
            <h1 className={styles['about__descr-title']}>About Me</h1>
            <p className={aboutDescrTextClass}>
                Hi! My name is Artem Sokur and I&apos;m a Junior Frontend Developer. I am already familiar with main Web Technologies like
                React, HTML, CSS, JavaScript and Git version control system.
            </p>
            <p className={aboutDescrTextClass}>
                This page was developed during the course{' '}
                <Link to="https://www.mastersacademy.education/frontend-react-it" className={styles['intro']}>
                    &apos;Intro to React&apos;
                </Link>{' '}
                from Masters Academy in 2024.
            </p>
            <p className={aboutDescrTextClass}>
                This is a social project from MOCG company where I got an opportunity to work with Frontend mentors and to create my own
                small project for the portfolio.
            </p>
            <p className={aboutDescrTextClass}>
                You can contact me via{' '}
                <Link to="https://t.me/Grim_679" className={styles['link']}>
                    telegram
                </Link>{' '}
                and check out my{' '}
                <Link to="https://github.com/Grimdvl" className={styles['link']}>
                    GitHub
                </Link>
                .
            </p>
        </div>
        <div className={styles['about__logo']}>
            <img className={styles['about__logo-img']} src={aboutImg} alt="orange stairs" />
        </div>
    </section>
);
