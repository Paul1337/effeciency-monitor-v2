import { useSelector } from 'react-redux';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { RootState } from '../../../../domain/redux/store';
import { FC } from 'react';
import { incrementDays } from '../../../../domain/shared/dates/datesOperations';
import { stringifyDate } from '../../../../domain/shared/dates/stringifyDate';
import { IHistoryItem } from '../../../../domain/entities/HistoryItem/model';
import { IDailyPlan } from '../../../../domain/entities/PlanItem/model';
import { config } from './config';
import { Heading } from '@chakra-ui/react';
import { compareDays } from '../../../../domain/shared/dates/compareDates';

interface IDailyPlanStatProps {
    dealName: string;
}

const buildData = (dealName: string, historyItems: IHistoryItem[], dailyPlans: IDailyPlan[]) => {
    const data = [];
    const currentDate = new Date();
    const currentWeekday = (currentDate.getDay() + 6) % 7;

    for (let i = config.lastDaysCount - 1; i >= 0; i--) {
        const indexDay = incrementDays(currentDate, -i);

        const done =
            historyItems.find(item => compareDays(indexDay, item.date) === 0)?.done[dealName] ?? 0;
        const todo =
            dailyPlans.find(
                plan => plan.deal.name === dealName && plan.weekdays.includes(currentWeekday)
            )?.count ?? 0;
        const percent = todo === 0 ? 100 : Number(((done / todo) * 100).toFixed(1));
        data.push({
            name: stringifyDate(indexDay),
            value: percent,
        });
    }
    return data;
};

export const DailyPlanStat: FC<IDailyPlanStatProps> = props => {
    const { dealName } = props;
    const historyItems = useSelector((state: RootState) => state.history.items);
    const dailyPlans = useSelector((state: RootState) => state.plans.dailyPlans);

    const data = buildData(dealName, historyItems, dailyPlans);

    return (
        <>
            <Heading mb={2}>{dealName}</Heading>
            <ResponsiveContainer width={'100%'} height={300}>
                <LineChart data={data}>
                    <Line type='monotone' dataKey='value' stroke='#8884d8' />
                    <CartesianGrid stroke='#ccc' />
                    <XAxis dataKey={'name'} />
                    <YAxis dataKey={'value'} />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};
