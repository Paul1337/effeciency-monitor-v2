import { FC } from 'react';
import { DailyPlanStat } from './DailyPlanStat';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../domain/redux/store';

export const DailyPlansStat = () => {
    const dailyPlans = useSelector((state: RootState) => state.plans.dailyPlans);
    return (
        <>
            {dailyPlans.map(plan => (
                <DailyPlanStat dealName={plan.deal.name} key={plan.id} />
            ))}
        </>
    );
};
