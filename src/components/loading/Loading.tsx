import React from 'react';

import styles from './loading.module.css';

const Loading: React.FC = () => (
    <div className={styles['products-loading']}>
        <i className="bx bx-loader-alt"></i>
    </div>
);

export default Loading;
