import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'redux-first-router-link';
import { goToPage } from '../../state/page';
import styles from './Sidebar.scss';

function Sidebar({ onClick, path }) {
    return (
        <div className={styles.sidebar}>
            <h2>SEO-FRIENDLY LINKS</h2>

            <NavLink activeClassName={styles.active} exact to="/">
                HOME
            </NavLink>

            <NavLink activeClassName={styles.active} to="/list/db-graphql">
                DB & GRAPHQL
            </NavLink>

            <NavLink activeClassName={styles.active} to={['list', 'react-redux']}>
                REACT & REDUX
            </NavLink>

            <NavLink activeClassName={styles.active} to={{ type: 'LIST', payload: { category: 'fp' } }}>
                FP
            </NavLink>

            <div style={{ height: 20 }} />
            <h2>EVENT HANDLERS</h2>

            <span
                className={isActive(path, '/')}
                onClick={() => onClick('HOME')}
                onKeyUp={() => onClick('HOME')}
                role="link"
                tabIndex="0"
            >
                HOME
            </span>

            <span
                className={isActive(path, '/list/db-graphql')}
                onClick={() => onClick('LIST', 'db-graphql')}
                onKeyUp={() => onClick('LIST', 'db-graphql')}
                role="link"
                tabIndex="0"
            >
                DB & GRAPHQL
            </span>

            <span
                className={isActive(path, '/list/react-redux')}
                onClick={() => onClick('LIST', 'react-redux')}
                onKeyUp={() => onClick('LIST', 'react-redux')}
                role="link"
                tabIndex="0"
            >
                REACT & REDUX
            </span>

            <span
                className={isActive(path, '/list/fp')}
                onClick={() => onClick('LIST', 'fp')}
                onKeyUp={() => onClick('LIST', 'fp')}
                role="link"
                tabIndex="0"
            >
                FP
            </span>

            <div style={{ height: 14 }} />

            <NavLink to={{ type: 'ADMIN' }} activeClassName={styles.active}>
                ADMIN
            </NavLink>
        </div>
    );
}

function isActive(currentPath, path) {
    return currentPath === path ? styles.active : '';
}

const mapDispatchToProps = {
    onClick: goToPage,
};

function mapStateToProps({ location }) {
    return {
        path: location.pathname,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
