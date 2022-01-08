/* eslint-disable import/prefer-default-export */

// Convert Unix timestamp to dd/MM/yyyy hh:mm am/pm
export const parseDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp);

    const dateStr = date.toLocaleDateString('en-GB');
    const timeStr = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
    const parsedDate = `${dateStr} ${timeStr}`;

    return parsedDate;
};
