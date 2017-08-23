import React from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, Transition } from 'transition-group';
import universal from 'react-universal-component';

import Loading from './Loading';
import Err from './Error';
import { isLoading } from '../state/loading/selectors';
import styles from '../css/Switcher.scss';

const UniversalComponent = universal(({ page }) => import(`./${page}`), {
    minDelay: 500,
    loading: Loading,
    error: Err,
});

function Switcher({ page, direction, isLoading }) {
    return (
        <TransitionGroup
            className={`${styles.switcher} ${direction}`}
            duration={500}
            prefix="fade"
        >
            <Transition key={page}>
                <UniversalComponent page={page} isLoading={isLoading} />
            </Transition>
        </TransitionGroup>
    );
}

const mapState = ({ page, direction, ...state }) => ({
    page,
    direction,
    isLoading: isLoading(state),
});

export default connect(mapState)(Switcher);
