import { TWeekdaysCount } from '../../models/PlanItem/model';
import { IValidationResult } from './model';
import { useDealValidation } from './useDealValidation';

type TUseDailyPlanValidation = (dealName: string, weekdaysCount: TWeekdaysCount) => IValidationResult;

export const useDailyPlanValidation: TUseDailyPlanValidation = (dealName, weekdaysCount) => {
    const dealValidationResult = useDealValidation(dealName);
    if (!dealValidationResult.isValid) return dealValidationResult;

    let error;

    if (weekdaysCount.some(count => count < 0)) {
        error = `Plan amounts should be not positive`;
    }

    return error ? { isValid: false, error } : { isValid: true };
};
