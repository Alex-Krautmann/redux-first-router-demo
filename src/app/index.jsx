import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import AppContainer from 'react-hot-loader/lib/AppContainer';
import App from './AppComponent';
import configureStore from './configureStore';

const history = createHistory();
const { store } = configureStore(history, window.REDUX_STATE);

function render(AppComponent) {
    const root = document.getElementById('root');

    ReactDOM.hydrate(
        <AppContainer>
            <Provider store={store}>
                <AppComponent />
            </Provider>
        </AppContainer>,
        root,
    );
}

render(App);

if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('./AppComponent', () => {
        // eslint-disable-next-line global-require
        render(require('./AppComponent').default);
    });
}
