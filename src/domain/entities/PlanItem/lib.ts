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
    weekdaysCount: Array<number>;
}

export const generateDailyPlanID = (plan: IGenerateDailyPlanIDParams) => {
    return plan.dealName + plan.weekdaysCount.toString();
};
