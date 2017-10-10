import React from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, Transition } from 'transition-group';
import universal from 'react-universal-component';

import Loading from '../Loading';
import Error from '../Error';
import isLoadingSelector from '../../state/isLoading';
import styles from './Switcher.scss';

const UniversalComponent = universal(({ page }) => import(`../../pages/${page}`), {
    // minDelay: 200,
    loading: Loading,
    error: Error,
});

function Switcher({ page, direction, isLoading }) {
    return (
        <TransitionGroup className={`${styles.switcher} ${direction}`} duration={300} prefix="fade">
            <Transition key={page}>
                <UniversalComponent page={page} isLoading={isLoading} />
            </Transition>
        </TransitionGroup>
    );
}

function mapStateToProps({ page, direction, ...state }) {
    return {
        page,
        direction,
        isLoading: isLoadingSelector(state),
    };
}

export default connect(mapStateToProps)(Switcher);
