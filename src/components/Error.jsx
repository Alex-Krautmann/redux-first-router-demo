import React from 'react';
import styles from '../css/Switcher.scss';

export default function Error(error) {
    return (
        <div className={styles.text}>
            ERROR: {error.message}
        </div>
    );
}
