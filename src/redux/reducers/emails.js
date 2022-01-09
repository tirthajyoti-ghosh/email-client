import { combineReducers } from 'redux';

const emails = (state = [], action) => {
    switch (action.type) {
    case 'ADD_EMAILS':
        return action.emails;
    default:
        return state;
    }
};

const selectedEmailId = (state = '', action) => {
    switch (action.type) {
    case 'ADD_EMAIL_ID':
        return action.selectedEmailId;
    default:
        return state;
    }
};

const currentEmailBody = (state = {}, action) => {
    switch (action.type) {
    case 'ADD_EMAIL_BODY':
        return {
            ...state,
            ...action.emailBody,
        };
    default:
        return state;
    }
};

const isEmailBodyOpen = (state = false, action) => {
    switch (action.type) {
    case 'OPEN_EMAIL_BODY':
        return true;
    default:
        return state;
    }
};

export default combineReducers({
    emails,
    selectedEmailId,
    isEmailBodyOpen,
    currentEmailBody,
});
