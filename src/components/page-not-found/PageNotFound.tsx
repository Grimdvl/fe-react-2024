import styles from './pageNotFound.module.css';

const PageNotFound: React.FC = () => (
    <div className={styles['pageNotFound']}>
        <h2 className={styles['pageNotFound-title']}>Page Not Found</h2>
        <p className={styles['pageNotFound-text']}>Sorry, the page you are looking for does not exist.</p>
    </div>
);

export default PageNotFound;
