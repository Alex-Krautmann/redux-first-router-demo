import React from 'react';
import { spinner } from '../css/Switcher.scss';

export default function Loading() {
    return (
        <div className={spinner}>
            <div />
        </div>
    );
}
