import React from 'react';
import { spinner } from '../../../src/css/Switcher.scss';

export default function Loading() {
    return (
        <div className={spinner}>
            <div />
        </div>
    );
}
