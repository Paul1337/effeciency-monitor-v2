import { useSelector } from 'react-redux';
import { RootState } from '../../../../domain/redux/store';

export const useData = () => {
    const longPlans = useSelector((state: RootState) => state.plans.longPlans);

    const info = {} as Record<string, string>;

    for (const plan of longPlans) {
        const done = 0;
        const todo = plan.count;
        const success = ((done / todo) * 100).toFixed(2);
        info[plan.deal.name] = success;
    }

    return info;
};
