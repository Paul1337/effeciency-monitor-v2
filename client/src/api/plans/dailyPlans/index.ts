import { addPlan } from './addPlan';
import { getPlans } from './getPlans';
import { removePlan } from './removePlan';
import { getAccumulationRelativeStat, getAccumulationStat, getDailyRelativeStat } from './stat';

export const dailyPlansApi = {
    addPlan,
    getPlans: getPlans,
    removePlan: removePlan,

    getDailyRelativeStat: getDailyRelativeStat,
    getAccumulationStat: getAccumulationStat,
    getAccumulationRelativeStat: getAccumulationRelativeStat,
};
