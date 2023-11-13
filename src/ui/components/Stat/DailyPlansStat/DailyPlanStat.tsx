import { Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { IDailyPlan } from '../../../../domain/entities/PlanItem/model';
import { OverallDailyPlanInfo } from './OverallDailyPlanInfo';
import { useData } from './useData';

interface IDailyPlanStatProps {
    plan: IDailyPlan;
}

export const DailyPlanStat: FC<IDailyPlanStatProps> = props => {
    const { plan } = props;
    const { chartData, info } = useData(plan);

    return (
        <>
            <Heading mb={2}>{plan.deal.name}</Heading>
            <OverallDailyPlanInfo info={info} />
            <ResponsiveContainer width={'100%'} height={300}>
                <LineChart data={chartData}>
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
