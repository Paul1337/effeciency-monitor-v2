import {
    ForbiddenException,
    HttpCode,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { CreateDailyPlanDto } from './dto/create-daily-plan.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DailyPlansService {
    public constructor(private databaseService: DatabaseService) {}

    async create(createDailyPlanDto: CreateDailyPlanDto, userId: number) {
        await this.verifyUserHasDeal(createDailyPlanDto.dealId, userId);
        const res = await this.databaseService.dbClient.query(
            'insert into public.daily_plan (user_id, deal_id, weekdays_count) values ($1, $2, $3) returning id',
            [userId, createDailyPlanDto.dealId, JSON.stringify(createDailyPlanDto.weekdaysCount)],
        );
        return res.oid;
    }

    async findAll(userId: number) {
        const res = await this.databaseService.dbClient.query(
            'select * from daily_plan where user_id = $1',
            [userId],
        );
        return res.rows;
    }

    async remove(id: number, userId: number) {
        await this.verifyUserHasPlan(id, userId);
        await this.databaseService.dbClient.query('delete from public.daily_plan where id = $1', [id]);
    }

    async verifyUserHasPlan(planId: number, userId: number) {
        const res = await this.databaseService.dbClient.query(
            'select * from public.daily_plan where id = $1 and user_id = $2',
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
