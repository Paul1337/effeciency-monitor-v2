interface IGenerateLongPlanIDParams {
    dealName: string;
    date: string;
    count: number;
}

export const generateLongPlanID = (plan: IGenerateLongPlanIDParams) => {
    return plan.dealName + plan.date + plan.count.toString();
};

interface IGenerateDailyPlanIDParams {
    dealName: string;
    weekdays: Array<number>;
    count: number;
}

export const generateDailyPlanID = (plan: IGenerateDailyPlanIDParams) => {
    return plan.dealName + plan.weekdays.toString() + plan.count.toString();
};
