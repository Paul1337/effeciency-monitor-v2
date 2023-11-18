import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IValidationResult } from './model';

type TUseDailyPlanValidation = (dealName: string) => IValidationResult;

const config = {
    minDealNameLength: 4,
};

export const useDealValidation: TUseDailyPlanValidation = dealName => {
    // const deals = useSelector((state: RootState) => state.deals.deals);
    let error = '';

    if (dealName.length < config.minDealNameLength) {
        error = `Deal name should not be less than ${config.minDealNameLength} symbols long`;
    }

    if (dealName.length === 0) {
        error = `Deal name should not be empty`;
    }

    // if (deals.some(deal => deal.name === dealName)) {
    //     error = `Deal with name ${dealName} already exists`;
    // }

    return error ? { isValid: false, error } : { isValid: true };
};
