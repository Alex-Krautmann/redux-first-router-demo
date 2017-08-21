import React from 'react';
import { notFound } from '../css/Switcher.scss';

export default function Error(error) {
    return (
        <div className={notFound}>
            ERROR: {error.message}
        </div>
    );
}
