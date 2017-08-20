import React from 'react';

import Sidebar from './Sidebar';
import Switcher from './Switcher';

import styles from '../css/App';

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
