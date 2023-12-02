import { addPlan } from './addPlan';
import { getPlans } from './getPlans';
import { removePlan } from './removePlan';
import { getStat } from './stat';

export const longPlansApi = {
    addPlan,
    getPlans: getPlans,
    removePlan: removePlan,

    getStat: getStat,
};
