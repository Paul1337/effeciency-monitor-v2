import React, { FC } from 'react';
import { IDailyPlan } from '../../../../domain/entities/PlanItem/model';

interface IOverallDailyPlanInfoProps {
    plan: IDailyPlan;
}

export const OverallDailyPlanInfo: FC<IOverallDailyPlanInfoProps> = props => {
    const { plan } = props;
    return <div>OverallDailyPlanInfo</div>;
};
