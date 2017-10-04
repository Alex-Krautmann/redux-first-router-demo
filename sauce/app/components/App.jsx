import React from 'react';

import Sidebar from './Sidebar';
import Switcher from './Switcher';

import styles from '../../../src/css/App.scss';

export default function App() {
    return (
        <div>
            <div className={styles.app}>
                <Sidebar />
                <Switcher />
            </div>
        </div>
    );
}
