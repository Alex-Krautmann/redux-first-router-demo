import { redirect } from 'redux-first-router';
import { isAllowed, isServer } from '../services/index';

export default {
    onBeforeChange: (dispatch, getState, action) => {
        const allowed = isAllowed(action.type, getState());

        if (!allowed) {
            const action = redirect({ type: 'LOGIN' });
            dispatch(action);
        }
    },
    onAfterChange: (dispatch, getState) => {
        const { type } = getState().location;

        if (type === 'LOGIN' && !isServer) {
            setTimeout(() => {
                // eslint-disable-next-line no-alert
                alert(alertMessage);
            }, 1500);
        }
    },
};

const alertMessage =
    "NICE, You're adventurous! Try changing the jwToken cookie from 'fake' to 'real' in server/index.jsx (and manually refresh) to access the Admin Panel. Then 'onBeforeChange' will let you in.";
