import Link from '../link/Link.tsx';

import styles from './footer.module.css';

const socialMediaClass = styles['foot__social-media'];

export const Footer = () => (
    <section className={styles['foot']}>
        <div className={styles['foot__social']}>
            <Link href="https://www.facebook.com/cherkasy.masters" className={socialMediaClass}>
                <i className={`${styles['social__media-facebook']} bx bxl-facebook`}></i>
            </Link>
            <Link href="https://www.linkedin.com/company/masters-academy-educational-project" className={socialMediaClass}>
                <i className={`${styles['social__media-linkedin']} bx bxl-linkedin`}></i>
            </Link>
            <Link href="https://www.instagram.com/masters_academy__/" className={socialMediaClass}>
                <i className={`${styles['social__media-instagram']} bx bxl-instagram-alt`}></i>
            </Link>
        </div>

        <div className={styles['foot__subscription']}>
            Made with 💗 on course
            <Link href="https://www.mastersacademy.education/frontend-react-it" className={styles['foot__subscription-link']}>
                &apos;Intro to React&apos; from Masters Academy in 2024
            </Link>
            , by{' '}
            <Link href="https://www.instagram.com/artemsokur69" className={styles['foot__subscription-link']}>
                Artem Sokur
            </Link>
        </div>
    </section>
);
