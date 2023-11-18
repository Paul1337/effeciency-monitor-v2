import { useSelector } from 'react-redux';
import { RootState } from '../../../../domain/redux/store';
import { compareDays } from '../../../../lib/dates/compareDates';

interface IChartDataItem {
    name: string;
    percentValue: number;
}

export const useData = () => {
    const longPlans = useSelector((state: RootState) => state.plans.longPlans);

    // todo: api request data
    const historyItems = useSelector((state: RootState) => state.history.items);

    const info = {} as Record<string, string>;
    const chartData: Array<IChartDataItem> = [];

    for (const plan of longPlans) {
        const done = historyItems
            .filter(
                item =>
                    compareDays(item.date, plan.startDate) >= 0 && compareDays(item.date, plan.date) <= 0
            )
            .reduce((acc, item) => acc + (item.done[plan.deal.name] ?? 0), 0);
        const todo = plan.count;
        const percentValue = ((done / todo) * 100).toFixed(2);
        info[plan.deal.name] = percentValue + '%';
        chartData.push({
            name: plan.deal.name,
            percentValue: Number(percentValue),
        });
    }

    return {
        info,
        chartData,
    };
};
