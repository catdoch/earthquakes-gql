const datePadding = date => {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    return { year, month, day };
};

const getDateParams = () => {
    const pad = n => (n < 10 ? '0' + n : n);
    const dateObj = new Date();
    const convertedDate = datePadding(dateObj);
    return `${convertedDate.year}-${pad(convertedDate.month)}-${pad(convertedDate.day)}`;
};

const friendlyDate = () => {
    const pad = n => (n < 10 ? '0' + n : n);
    const newDate = new Date();
    const convertedDate = datePadding(newDate);

    return `${pad(convertedDate.day)}/${pad(convertedDate.month)}/${convertedDate.year}`;
};

module.exports = { getDateParams, friendlyDate };
