import { addPlan } from './addPlan';
import { getPlans } from './getPlans';
import { removePlan } from './removePlan';

export const longPlansApi = {
    addPlan,
    getPlans: getPlans,
    removePlan: removePlan,
};
