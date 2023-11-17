import { IDailyPlan, IPlanItem } from '../../../models/PlanItem/model';

export interface IPlansSliceScheme {
    longPlans: IPlanItem[];
    dailyPlans: IDailyPlan[];
}
