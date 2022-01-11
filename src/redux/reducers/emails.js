import { filterEmails, markEmailAsRead, toggleFavoriteStatus } from '../../utils/general';

const emails = (state = [], action, rootState) => {
    switch (action.type) {
    case 'ADD_EMAILS':
        return {
            ...state,
            [rootState.currentPage]: action.emails,
        };
    case 'MARK_EMAIL_AS_FAVORITE':
        return {
            ...state,
            [rootState.currentPage]: toggleFavoriteStatus(
                state[rootState.currentPage],
                action.emailId,
            ),
        };
    case 'MARK_EMAIL_AS_READ':
        return {
            ...state,
            [rootState.currentPage]: markEmailAsRead(
                state[rootState.currentPage],
                action.emailId,
            ),
        };
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

const currentFilter = (state = 'unread', action) => {
    switch (action.type) {
    case 'UPDATE_CURRENT_FILTER':
        return action.filter;
    default:
        return state;
    }
};

const filteredEmails = (state = [], action, rootState) => {
    switch (action.type) {
    case 'UPDATE_FILTERED_EMAILS':
        return {
            ...state,
            [rootState.currentPage]: filterEmails(
                rootState.emails[rootState.currentPage],
                rootState.currentFilter,
            ),
        };
    default:
        return state;
    }
};

const currentPage = (state = 1, action) => {
    switch (action.type) {
    case 'UPDATE_CURRENT_PAGE':
        return action.currentPage;
    default:
        return state;
    }
};

export default (state = {}, action) => ({
    emails: emails(state.emails, action, state),
    selectedEmailId: selectedEmailId(state.selectedEmailId, action, state),
    isEmailBodyOpen: isEmailBodyOpen(state.isEmailBodyOpen, action, state),
    currentEmailBody: currentEmailBody(state.currentEmailBody, action, state),
    currentFilter: currentFilter(state.currentFilter, action, state),
    filteredEmails: filteredEmails(state.filteredEmails, action, state),
    currentPage: currentPage(state.currentPage, action, state),
});
