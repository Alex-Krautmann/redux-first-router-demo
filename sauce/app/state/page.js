import { NOT_FOUND } from 'redux-first-router';

// Action Type Constants
const HOME = 'HOME';
const LIST = 'LIST';
const VIDEO = 'VIDEO';
const ADMIN = 'ADMIN';
const LOGIN = 'LOGIN';

// Reducer exported as default
export default function reducer(state = HOME, action = {}) {
    // NOTES: this is the primary reducer demonstrating how RFR replaces the need
    //        for React Router's <Route /> component.
    switch (action.type) {
        case HOME:
            return 'Home';
        case LIST:
            return 'List';
        case VIDEO:
            return 'Video';
        case ADMIN:
            return 'Admin';
        case LOGIN:
            return 'Login';
        case NOT_FOUND:
            return 'NotFound';
        default:
            return state;
    }
}

// Actions
export const goToPage = (type, category) => ({
    type,
    payload: category && { category },
});

export const goHome = () => ({
    type: HOME,
});

export const goToAdmin = () => ({
    type: ADMIN,
});

export const notFound = () => ({
    type: NOT_FOUND,
});

export const visitCategory = category => ({
    type: LIST,
    payload: { category },
});

export const visitVideo = slug => ({
    type: VIDEO,
    payload: { slug },
});
