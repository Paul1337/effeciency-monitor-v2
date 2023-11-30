import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { DoDealDto } from './dto/do-deal.dto';

@Injectable()
export class HistoryService {
    public constructor(private databaseService: DatabaseService) {}

    async doDeal(doDealDto: DoDealDto, userId: number) {
        const deal = await this.verifyUserHasDeal(doDealDto.dealId, userId);
        const historyItemRes = await this.databaseService.dbClient.query(
            'select * from public.history where deal_id = $1 and date = current_date',
            [deal.id],
        );
        const historyItem = historyItemRes.rows[0];

        if (historyItem) {
            await this.databaseService.dbClient.query(
                'update public.history set done_count=done_count+$1 where deal_id = $2 and date = current_date',
                [doDealDto.count, deal.id],
            );
        } else {
            await this.databaseService.dbClient.query(
                'insert into public.history (deal_id, user_id, done_count) values ($1, $2, $3)',
                [deal.id, userId, doDealDto.count],
            );
        }
    }

    async findAll(userId: number) {
        const historyItemRes = await this.databaseService.dbClient.query(
            'select h.*, d.name as deal_name from public.history h, public.deal d where h.user_id = $1 and d.id = h.deal_id',
            [userId],
        );
        return historyItemRes.rows;
    }

    async findToday(userId: number) {
        const historyItemRes = await this.databaseService.dbClient.query(
            'select h.*, d.name as deal_name from public.history h, public.deal d where h.user_id = $1 and d.id = h.deal_id and h.date = CURRENT_DATE',
            [userId],
        );
        return historyItemRes.rows;
    }

    async verifyUserHasDeal(dealId: number, userId: number) {
        const res = await this.databaseService.dbClient.query(
            'select * from public.deal where id = $1 and user_id = $2',
            [dealId, userId],
        );
        if (res.rows.length === 0) throw new ForbiddenException(`Current user can't manage that deal`);
        if (res.rows.length > 1)
            throw new InternalServerErrorException('Strangely deals are not unique');

        return res.rows[0];
    }
}
