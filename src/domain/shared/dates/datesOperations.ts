export const incrementDays = (date: Date, daysCount: number): Date => {
    const newDate = new Date(date.getTime());
    newDate.setDate(date.getDate() + daysCount);
    return newDate;
};
