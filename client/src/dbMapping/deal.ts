import { IDeal } from '../domain/models/Deal/model';

export interface IDBDeal {
    id: number;
    name: string;
    user_id: number;
}

export const mapDeal = (dbDeal: IDBDeal): IDeal => ({
    name: dbDeal.name,
    id: dbDeal.id,
});

export const mapDeals = (deals: IDBDeal[]) => deals.map(mapDeal);
