import { TDateFormat } from './model';

export const incrementDays = (date: TDateFormat, daysCount: number): Date => {
    date = makeDate(date);
    const newDate = new Date(date.getTime());
    newDate.setDate(date.getDate() + daysCount);
    return newDate;
};

export const daysBetween = (date1: TDateFormat, date2: TDateFormat) => {
    date1 = makeDate(date1);
    date2 = makeDate(date2);
};

export const makeDate = (date: TDateFormat) => {
    if (typeof date === 'string') date = strToDate(date);
    return date;
};

const normalizeItem = (item: number) => item.toString().padStart(2, '0');

export const stringifyDate = (date: Date) => {
    return `${normalizeItem(date.getDate())}/${normalizeItem(
        date.getMonth() + 1
    )}/${date.getFullYear()}`;
};

export const stringifyDateForDB = (date: Date) => {
    return `${date.getFullYear()}/${normalizeItem(date.getMonth() + 1)}/${normalizeItem(
        date.getDate()
    )}`;
};

export const strToDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    const date = new Date();
    date.setDate(day);
    date.setMonth(month - 1);
    date.setFullYear(year);
    return date;
};
