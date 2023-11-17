import { useSelector } from 'react-redux';
import { TWeekdaysCount } from '../../../../domain/entities/PlanItem/model';
import { RootState } from '../../../../domain/redux/store';

export const useDailyPlanValidation = (dealName: string, weekdaysCount: TWeekdaysCount) => {
    const deals = useSelector((state: RootState) => state.deals.deals);

    if (dealName.length < 4) return false;
    if (weekdaysCount.some(count => count <= 0)) return false;
    if (deals.some(deal => deal.name === dealName)) return false;

    return true;
};
