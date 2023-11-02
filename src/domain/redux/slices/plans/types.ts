import { IDailyPlan, IPlanItem } from '../../../entities/PlanItem/model';

export interface IPlansSliceScheme {
    longPlans: IPlanItem[];
    dailyPlans: IDailyPlan[];
}
