import { useSelector } from 'react-redux';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { RootState } from '../../../../domain/redux/store';
import { FC } from 'react';
import { incrementDays } from '../../../../domain/shared/dates/datesOperations';
import { stringifyDate } from '../../../../domain/shared/dates/stringifyDate';
import { IHistoryItem } from '../../../../domain/entities/HistoryItem/model';
import { IDailyPlan } from '../../../../domain/entities/PlanItem/model';

interface IDailyPlanStatProps {
    dealName: string;
}

const config = {
    daysBack: 30,
};

const buildData = (dealName: string, historyItems: IHistoryItem[], dailyPlans: IDailyPlan[]) => {
    const data = [];
    const currentDate = new Date();
    for (let i = 0; i < config.daysBack; i++) {
        const indexDay = incrementDays(currentDate, -i);
        data.push({
            name: stringifyDate(indexDay),
            value: i,
        });
    }
    return data;
};

export const PlanStat: FC<IDailyPlanStatProps> = props => {
    const { dealName } = props;
    const historyItems = useSelector((state: RootState) => state.history.items);
    const dailyPlans = useSelector((state: RootState) => state.plans.dailyPlans);

    const data = buildData(dealName, historyItems, dailyPlans);

    // const data = historyItems.map(item => ({
    //     name: item.date,
    //     value: '',
    // }));

    return (
        <LineChart width={1000} height={300} data={data}>
            <Line type='monotone' dataKey='uv' stroke='#8884d8' />
            <CartesianGrid stroke='#ccc' />
            <XAxis dataKey={'name'} />
            <YAxis dataKey={'value'} />
            <Tooltip />
        </LineChart>
    );
};
