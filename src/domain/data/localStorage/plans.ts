import localStorageConfig from '../../config/localStorage/localStorageConfig';
import { IPlansSliceScheme } from '../../redux/slices/plans/types';

export const updatePlansDataInStorage = (plansData: IPlansSliceScheme) => {
    localStorage.setItem(localStorageConfig.PlansKey, JSON.stringify(plansData));
};
