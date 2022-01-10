export const addEmails = (emails) => ({
    type: 'ADD_EMAILS',
    emails,
});

export const addEmailId = (selectedEmailId) => ({
    type: 'ADD_EMAIL_ID',
    selectedEmailId,
});

export const addEmailBody = (emailBody) => ({
    type: 'ADD_EMAIL_BODY',
    emailBody,
});

export const openEmailBody = () => ({
    type: 'OPEN_EMAIL_BODY',
});

export const updateCurrentFilter = (filter) => ({
    type: 'UPDATE_CURRENT_FILTER',
    filter,
});

export const updateFilteredEmails = (filteredEmails) => ({
    type: 'UPDATE_FILTERED_EMAILS',
    filteredEmails,
});

export const markEmailAsFavorite = (emailId) => ({
    type: 'MARK_EMAIL_AS_FAVORITE',
    emailId,
});
