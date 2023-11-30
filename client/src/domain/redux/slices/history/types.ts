import { IHistoryItem } from '../../../models/HistoryItem/model';

export interface IHistorySliceScheme {
    items: IHistoryItem[];
    today: IHistoryItem | null;
}
