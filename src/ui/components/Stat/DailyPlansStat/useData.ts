import { useSelector } from 'react-redux';
import { IDailyPlan } from '../../../../domain/entities/PlanItem/model';
import { RootState } from '../../../../domain/redux/store';
import { config } from './config';
import { incrementDays } from '../../../../domain/shared/dates/datesOperations';
import { compareDays } from '../../../../domain/shared/dates/compareDates';
import { stringifyDate } from '../../../../domain/shared/dates/stringifyDate';
import { EInfoItems, IChartItem } from './model';

interface IUseDataResult {
    chartData: Array<IChartItem>;
    info: Record<EInfoItems, string>;
}

export const useData = (plan: IDailyPlan): IUseDataResult => {
    const historyItems = useSelector((state: RootState) => state.history.items);

    const chartData = [];
    const currentDate = new Date();
    const currentWeekday = (currentDate.getDay() + 6) % 7;

    let totalDone = 0;
    let totalTodo = 0;
    let totalCrisis = 0;
    let crisisCount = 0;

    for (let i = config.lastDaysCount - 1; i >= 0; i--) {
        const indexDay = incrementDays(currentDate, -i);

        const done =
            historyItems.find(item => compareDays(indexDay, item.date) === 0)?.done[plan.deal.name] ?? 0;
        const todo = plan.weekdaysCount[currentWeekday];

        const percent = todo === 0 ? 100 : Number(((done / todo) * 100).toFixed(1));
        chartData.push({
            name: stringifyDate(indexDay),
            value: percent,
        });

        totalDone += done;
        totalTodo += todo;

        if (done < config.crisisBorder * todo) {
            crisisCount++;
            totalCrisis += (1 - done / (config.crisisBorder * todo)) * 100;
        }
    }

    return {
        chartData,
        info: {
            [EInfoItems.success]: (totalDone / totalTodo).toFixed(2) + '%',
            [EInfoItems.crisis]: (totalCrisis / config.lastDaysCount).toFixed(2) + '%',
            [EInfoItems.crisisCount]: crisisCount.toString(),
        },
    };
};
