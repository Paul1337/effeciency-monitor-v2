import { addPlan } from './addPlan';
import { getPlans } from './getPlans';
import { removePlan } from './removePlan';

export const dailyPlansApi = {
    addPlan,
    getPlans: getPlans,
    removePlan: removePlan,
};
