import localStorageConfig from '../../config/localStorage/localStorageConfig';
import { IPlansSliceScheme } from '../slices/plans/types';

export const updatePlansDataInStorage = (plans: IPlansSliceScheme) => {
    localStorage.setItem(localStorageConfig.PlansKey, JSON.stringify(plans));
};
