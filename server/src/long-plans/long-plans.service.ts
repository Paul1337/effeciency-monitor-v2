import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateLongPlanDto } from './dto/create-long-plan.dto';

@Injectable()
export class LongPlansService {
    public constructor(private databaseService: DatabaseService) {}

    async create(createLongPlanDto: CreateLongPlanDto, userId: number) {
        await this.verifyUserHasDeal(createLongPlanDto.dealId, userId);
        await this.databaseService.dbClient.query(
            'insert into public.long_plan (user_id, deal_id, date, count) values ($1, $2, $3, $4)',
            [userId, createLongPlanDto.dealId, createLongPlanDto.date, createLongPlanDto.count],
        );
    }

    async findAll(userId: number) {
        const res = await this.databaseService.dbClient.query(
            'select * from long_plan where user_id = $1',
            [userId],
        );
        return res.rows;
    }

    async remove(id: number, userId: number) {
        await this.verifyUserHasPlan(id, userId);
        await this.databaseService.dbClient.query('delete from public.long_plan where id = $1', [id]);
    }

    async verifyUserHasPlan(planId: number, userId: number) {
        const res = await this.databaseService.dbClient.query(
            'select * from public.long_plan where id = $1 and user_id = $2',
            [planId, userId],
        );
        if (res.rows.length === 0) throw new ForbiddenException(`Current user can't manage that plan`);
        if (res.rows.length > 1)
            throw new InternalServerErrorException('Strangely plans are not unique');

        return res.rows[0];
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
