import { dailyPlansApi } from '../../../../api/plans/dailyPlans';
import { IDailyPlan } from '../../../../domain/models/PlanItem/model';
import { EChartType, IChartItem, IData } from './model';

interface IDBStatItem {
    date: string;
    value: string;
}

export const loadData = async (plan: IDailyPlan, chartType: EChartType): Promise<IData> => {
    switch (chartType) {
        case EChartType.DailyRelative:
            const dailyRelativeStat = await dailyPlansApi.getDailyRelativeStat(plan.id);
            return {
                chartsData: dailyRelativeStat.map((st: IDBStatItem) => ({
                    name: new Date(st.date).toLocaleDateString(),
                    value: Number(st.value ?? 0),
                })),
            };
        // return null;

        case EChartType.Accumulation:
            const accumulationStat = await dailyPlansApi.getAccumulationStat(plan.id);
            return {
                chartsData: accumulationStat.map((st: IDBStatItem) => ({
                    name: st.date,
                    value: Number(st.value ?? 0),
                })),
            };

        case EChartType.AccumulationRelative:
            const accumulationRelativeStat = await dailyPlansApi.getAccumulationRelativeStat(plan.id);
            return {
                chartsData: accumulationRelativeStat.map((st: IDBStatItem) => ({
                    name: st.date,
                    value: Number(st.value ?? 0),
                })),
            };
    }
};
