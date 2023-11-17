import localStorageConfig from '../../../config/localStorage/localStorageConfig';
import { IDeal } from '../../models/Deal/model';

export const updateDealsDataInStorage = (deals: IDeal[]) => {
    localStorage.setItem(localStorageConfig.DealsKey, JSON.stringify(deals));
};
