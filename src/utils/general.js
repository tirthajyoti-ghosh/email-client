// Convert Unix timestamp to dd/MM/yyyy hh:mm am/pm
export const parseDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp);

    const dateStr = date.toLocaleDateString('en-GB');
    const timeStr = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
    const parsedDate = `${dateStr} ${timeStr}`;

    return parsedDate;
};

export const markEmailAsRead = (emails, emailId) => {
    const emailIndex = emails.findIndex((email) => email.id === emailId);
    const newEmails = [...emails];
    newEmails[emailIndex].isRead = true;

    return newEmails;
};

export const toggleFavoriteStatus = (emails, emailId) => {
    const emailIndex = emails.findIndex((email) => email.id === emailId);
    const newEmails = [...emails];
    newEmails[emailIndex].isFavorite = !newEmails[emailIndex].isFavorite;

    return newEmails;
};

export const addAdditionalProperties = (arr = [], obj = {}) => {
    const newArr = [...arr];

    return newArr.map((item) => ({
        ...item,
        ...obj,
    }));
};
