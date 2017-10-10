import { redirect, NOT_FOUND } from 'redux-first-router';
import { fetchData } from '../services/index';

// NOTE: if you add another route here, make sure to link the page component to the route in ./state/page.js
export default {
    HOME: '/',
    LIST: {
        path: '/list/:category',
        thunk: async (dispatch, getState) => {
            const { jwToken, location: { payload: { category } }, videosByCategory } = getState();

            if (videosByCategory[category]) return;
            const videos = await fetchData(`/api/videos/${category}`, jwToken);

            if (videos.length === 0) {
                dispatch({ type: NOT_FOUND });
            } else {
                dispatch({ type: 'VIDEOS_FETCHED', payload: { videos, category } });
            }
        },
    },
    VIDEO: {
        path: '/video/:slug',
        thunk: async (dispatch, getState) => {
            const { jwToken, location: { payload: { slug } } } = getState();
            const video = await fetchData(`/api/video/${slug}`, jwToken);

            if (video) {
                dispatch({ type: 'VIDEO_FOUND', payload: { slug, video } });
            } else {
                dispatch({ type: NOT_FOUND });
            }
        },
    },
    PLAY: {
        path: '/video/:slug/play',
        thunk: (dispatch, getState) => {
            if (typeof window === 'undefined') {
                const { slug } = getState().location.payload;
                const action = redirect({ type: 'VIDEO', payload: { slug } });

                dispatch(action);
            }
        },
    },
    LOGIN: '/login',
    ADMIN: {
        path: '/admin', // TRY: visit this path or dispatch ADMIN
        role: 'admin', // + change jwToken to 'real' in server/index.jsx
    },
};
