import { TWeekdaysCount } from '../../../../domain/entities/PlanItem/model';

const config = {
    minLength: 4,
};

const isDealNameValid = (dealName: string) => {
    if (dealName.length < config.minLength) return false;

    return true;
};

const isWeekdaysCountValid = (weekdaysCount: TWeekdaysCount) => {};

export const isDailyPlanValid = (dealName: string, weekdaysCount: TWeekdaysCount) => {
    return isDealNameValid(dealName) && isWeekdaysCountValid(weekdaysCount);
};
