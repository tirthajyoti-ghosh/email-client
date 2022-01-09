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
