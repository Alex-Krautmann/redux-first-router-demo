import React from 'react';

import Sidebar from './components/Sidebar';
import Switcher from './components/Switcher';

import styles from './App.scss';

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
