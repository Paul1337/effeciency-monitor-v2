import { useSelector } from 'react-redux';
import { IDailyPlan } from '../../../../domain/entities/PlanItem/model';
import { RootState } from '../../../../domain/redux/store';
import { config } from './config';
import { incrementDays, stringifyDate } from '../../../../domain/shared/dates/datesOperations';
import { compareDays } from '../../../../domain/shared/dates/compareDates';
import { EChartType, EInfoItems, IChartItem } from './model';

export type TChartsData = Record<EChartType, Array<IChartItem>>;

interface IUseDataResult {
    chartsData: TChartsData;
    info: Record<EInfoItems, string>;
}

export const useData = (plan: IDailyPlan): IUseDataResult => {
    const historyItems = useSelector((state: RootState) => state.history.items);

    const chartsData: TChartsData = {
        [EChartType.DailyRelative]: [],
        [EChartType.Accumulation]: [],
        [EChartType.AccumulationRelative]: [],
    };

    const currentDate = new Date();
    const currentWeekday = (currentDate.getDay() + 6) % 7;

    let totalDone = 0;
    let totalTodo = 0;
    let totalCrisis = 0;
    let crisisCount = 0;

    let firstChartDay = incrementDays(currentDate, -config.lastDaysCount + 1);
    let accumulationDone = historyItems.reduce((acc, item) => {
        if (compareDays(plan.startDate, item.date) <= 0 && compareDays(item.date, firstChartDay) < 0) {
            return acc + item.done[plan.deal.name];
        }
        return acc;
    }, 0);
    let accumulationTodo = 0;

    let chartDays = 0;

    for (let i = 0; i < config.lastDaysCount; i++) {
        const indexDay = incrementDays(firstChartDay, i);
        if (compareDays(plan.startDate, indexDay) > 0) continue;
        chartDays++;

        const done =
            historyItems.find(item => compareDays(indexDay, item.date) === 0)?.done[plan.deal.name] ?? 0;
        const todo = plan.weekdaysCount[currentWeekday];
        accumulationDone += done;
        accumulationTodo += todo;

        const accumulationDoneRelative = accumulationDone / accumulationTodo;

        const dailyRelativePercent = todo === 0 ? 100 : Number(((done / todo) * 100).toFixed(1));

        chartsData[EChartType.DailyRelative].push({
            name: stringifyDate(indexDay),
            value: dailyRelativePercent,
        });

        chartsData[EChartType.Accumulation].push({
            name: stringifyDate(indexDay),
            value: accumulationDone,
        });

        chartsData[EChartType.AccumulationRelative].push({
            name: stringifyDate(indexDay),
            value: accumulationDoneRelative,
        });

        totalDone += done;
        totalTodo += todo;

        if (done < config.crisisBorder * todo) {
            crisisCount++;
            totalCrisis += (1 - done / (config.crisisBorder * todo)) * 100;
        }
    }

    return {
        chartsData,
        info: {
            [EInfoItems.success]: ((totalDone / totalTodo) * 100).toFixed(2) + '%',
            [EInfoItems.crisis]: ((totalCrisis / chartDays) * 100).toFixed(2) + '%',
            [EInfoItems.crisisCount]: crisisCount.toString(),
        },
    };
};
