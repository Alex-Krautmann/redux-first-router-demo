import React from 'react';
import { spinner } from '../css/Switcher';

export default function Loading() {
    return (
        <div className={spinner}>
            <div />
        </div>
    );
}
