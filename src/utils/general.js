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

export const filterEmails = (emails, filter) => {
    const newEmails = [...emails];

    switch (filter) {
    case 'unread':
        return newEmails.filter((email) => !email.isRead);
    case 'read':
        return newEmails.filter((email) => email.isRead);
    case 'favorites':
        return newEmails.filter((email) => email.isFavorite);
    default:
        return newEmails;
    }
};

export const arrayToObject = (arr = [], key) => {
    const newObj = {};

    arr.forEach((item) => {
        newObj[item[key]] = item;
    });

    return newObj;
};

export const removePropertiesFromObject = (obj = {}, properties = []) => {
    const newObj = { ...obj };

    properties.forEach((property) => {
        delete newObj[property];
    });

    return newObj;
};

export const convertEmailsArrToLocalStorage = (emails = []) => {
    const newEmails = [...emails];

    const emailsWithRemovedProps = newEmails.map((email) => (
        removePropertiesFromObject(email, ['date', 'from', 'short_description', 'subject'])));

    return arrayToObject(emailsWithRemovedProps, 'id');
};
