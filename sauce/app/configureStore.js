import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { connectRoutes } from 'redux-first-router';

import routesMap from './routeMap';
import options from './routeOptions';
import * as reducers from '../../src/reducers/index';
import * as actionCreators from '../../src/actions/index';

export default (history, preLoadedState) => {
    const { reducer, middleware, enhancer, thunk } = connectRoutes(history, routesMap, options);

    const rootReducer = combineReducers({ ...reducers, location: reducer });
    const middlewares = applyMiddleware(middleware);
    const enhancers = composeEnhancers(enhancer, middlewares);
    const store = createStore(rootReducer, preLoadedState, enhancers);

    if (module.hot && process.env.NODE_ENV === 'development') {
        module.hot.accept('../../src/reducers/index', () => {
            // eslint-disable-next-line global-require
            const updatedReducers = require('../../src/reducers/index');
            const updatedRootReducer = combineReducers({
                ...updatedReducers,
                location: reducer,
            });
            store.replaceReducer(updatedRootReducer);
        });
    }

    return { store, thunk };
};

const composeEnhancers = (...args) =>
    typeof window !== 'undefined' ? composeWithDevTools({ actionCreators })(...args) : compose(...args);
