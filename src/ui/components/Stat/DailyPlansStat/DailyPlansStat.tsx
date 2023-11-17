import { DailyPlanStat } from './DailyPlanStat';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../domain/redux/store';
import { Text } from '@chakra-ui/react';

export const DailyPlansStat = () => {
    const dailyPlans = useSelector((state: RootState) => state.plans.dailyPlans);
    return (
        <>
            {dailyPlans.length === 0 ? (
                <Text>No daily plans</Text>
            ) : (
                dailyPlans.map(plan => <DailyPlanStat plan={plan} key={plan.id} />)
            )}
        </>
    );
};
