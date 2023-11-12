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
import { OverallDailyPlanInfo } from './OverallDailyPlanInfo';

interface IDailyPlanStatProps {
    plan: IDailyPlan;
}

const buildData = (plan: IDailyPlan, historyItems: IHistoryItem[]) => {
    const data = [];
    const currentDate = new Date();
    const currentWeekday = (currentDate.getDay() + 6) % 7;

    for (let i = config.lastDaysCount - 1; i >= 0; i--) {
        const indexDay = incrementDays(currentDate, -i);

        const done =
            historyItems.find(item => compareDays(indexDay, item.date) === 0)?.done[plan.deal.name] ?? 0;
        const todo = plan.weekdaysCount[currentWeekday];

        // console.log(todo);

        const percent = todo === 0 ? 100 : Number(((done / todo) * 100).toFixed(1));
        data.push({
            name: stringifyDate(indexDay),
            value: percent,
        });
    }
    return data;
};

export const DailyPlanStat: FC<IDailyPlanStatProps> = props => {
    const { plan } = props;
    const historyItems = useSelector((state: RootState) => state.history.items);
    const data = buildData(plan, historyItems);

    return (
        <>
            <Heading mb={2}>{plan.deal.name}</Heading>
            <OverallDailyPlanInfo plan={plan} />
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
