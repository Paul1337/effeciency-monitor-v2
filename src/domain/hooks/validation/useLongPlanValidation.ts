import { compareDays } from '../../../lib/dates/compareDates';
import { makeDate } from '../../../lib/dates/datesOperations';
import { TDateFormat } from '../../../lib/dates/model';
import { IValidationResult } from './model';
import { useDealValidation } from './useDealValidation';

type TUseDailyPlanValidation = (dealName: string, planDate: TDateFormat) => IValidationResult;

export const useLongPlanValidation: TUseDailyPlanValidation = (dealName, planDate) => {
    const dealValidationResult = useDealValidation(dealName);
    if (!dealValidationResult.isValid) return dealValidationResult;

    let error;

    const currentDate = new Date();
    if (compareDays(currentDate, planDate) >= 0) {
        error = `Plan date should be after today`;
    }

    return error ? { isValid: false, error } : { isValid: true };
};
