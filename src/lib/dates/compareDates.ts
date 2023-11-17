import { makeDate } from './datesOperations';

export const sameDay = (date1: Date | string, date2: Date | string) => {
    return compareDays(date1, date2) === 0;
};

export const compareDays = (date1: Date | string, date2: Date | string) => {
    date1 = makeDate(date1);
    date2 = makeDate(date2);

    if (date1.getFullYear() > date2.getFullYear()) return 1;
    if (date1.getFullYear() < date2.getFullYear()) return -1;

    if (date1.getMonth() > date2.getMonth()) return 1;
    if (date1.getMonth() < date2.getMonth()) return -1;

    if (date1.getDate() > date2.getDate()) return 1;
    if (date1.getDate() < date2.getDate()) return -1;

    return 0;
};
