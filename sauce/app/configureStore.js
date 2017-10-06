import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { connectRoutes } from 'redux-first-router';

import routesMap from './routeMap';
import options from './routeOptions';
// todo: make this smarter, right now we need to explictly import these files
import * as reducers from './state';
// todo: make this smarter, right now we need to explictly import these files
import * as actionCreators from './state/page';

export default (history, preLoadedState) => {
    const { reducer, middleware, enhancer, thunk } = connectRoutes(history, routesMap, options);

    const rootReducer = combineReducers({ ...reducers, location: reducer });
    const middlewares = applyMiddleware(middleware);
    const enhancers = composeEnhancers(enhancer, middlewares);
    const store = createStore(rootReducer, preLoadedState, enhancers);

    if (module.hot && process.env.NODE_ENV === 'development') {
        module.hot.accept('./state', () => {
            // eslint-disable-next-line global-require
            const updatedReducers = require('./state');
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
