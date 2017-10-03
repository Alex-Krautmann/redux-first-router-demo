import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import configureStore from './configureStore';
import App from '../../src/components/App';

// vendorJs is needed because autodll-webpack-plugin is used in development
// This speeds up webpack rebuilds by holding the vendor chunk in memory and not watching modules specified in entry.vendor
const vendorJs =
    process.env.NODE_ENV === 'development' ? '<script type="text/javascript" src="/static/vendor.js"></script>' : '';

const createAppWithStore = store => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default ({ clientStats }) => async (req, res) => {
    const store = await configureStore(req, res);
    if (!store) return; // no store means redirect was already served

    const app = createAppWithStore(store);
    const appString = ReactDOM.renderToString(app);
    const stateJson = JSON.stringify(store.getState());
    const chunkNames = flushChunkNames();
    const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames });

    // eslint-disable-next-line no-console
    console.log('REQUESTED PATH:', req.path);
    // eslint-disable-next-line no-console
    console.log('CHUNK NAMES', chunkNames);

    res.send(`
        <!doctype html>
        <html lang="en-US">
            <head>
                <meta charset="utf-8">
                <title>redux-first-router-demo</title>
                ${styles}
            </head>
            <body>
                <script>window.REDUX_STATE = ${stateJson}</script>
                <div id="root">${appString}</div>
                ${cssHash}
                ${vendorJs}
                ${js}
            </body>
        </html>
    `);
};
