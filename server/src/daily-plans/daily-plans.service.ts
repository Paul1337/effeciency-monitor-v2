import {
    ForbiddenException,
    HttpCode,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { CreateDailyPlanDto } from './dto/create-daily-plan.dto';
import { DatabaseService } from 'src/database/database.service';
import { statConfig } from './config/stat';

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

    async getDailyRelativeStat(userId: number, planId: number) {
        const planRow = await this.verifyUserHasPlan(planId, userId);

        const query = `
            select date, round(done_count / todo::integer * 100, 2) as value from (
            select generate_series as date, h.done_count, dp.weekdays_count->>(select ((extract(dow from generate_series) + 6)::integer % 7)::integer) as todo
            from generate_series((select start_date from daily_plan where deal_id = $2), current_date::date, '1 day')
            join public.daily_plan dp on dp.deal_id = $2 and dp.user_id = $3
            left join public.history h on h.deal_id = $2 and h.user_id = $3 and h.date = generate_series) subquery 
            where extract(day from current_date - date::timestamp) <= $1
        `;
        return await this.databaseService.queryRows(query, [
            statConfig.lastDaysCount,
            planRow.deal_id,
            userId,
        ]);
    }

    async getAccumulationStat(userId: number, planId: number) {
        const planRow = await this.verifyUserHasPlan(planId, userId);

        const query = `
            select date, done_accumulation as value from (
                select generate_series as date, sum(h.done_count) over (order by generate_series) as done_accumulation
                from generate_series((select start_date from daily_plan where deal_id = $2), current_date::date, '1 day')
                join public.daily_plan dp on dp.deal_id = $2 and dp.user_id = $3
                left join public.history h on h.deal_id = $2 and h.user_id = $3 and h.date = generate_series) subquery 
                where extract(day from current_date - date::timestamp) <= $1
        `;
        return await this.databaseService.queryRows(query, [
            statConfig.lastDaysCount,
            planRow.deal_id,
            userId,
        ]);
    }

    async getAccumulationRelativeStat(userId: number, planId: number) {
        const planRow = await this.verifyUserHasPlan(planId, userId);

        const historyRows = await this.databaseService.queryRows(
            `
            select date, (done_accumulation - todo_byday) as value from (
                    select generate_series as date, sum(h.done_count) over (order by generate_series) as done_accumulation
                    from generate_series((select start_date from daily_plan where deal_id = $2), current_date::date, '1 day')
                    join public.daily_plan dp on dp.deal_id = $2 and dp.user_id = $3
                    left join public.history h on h.deal_id = $2 and h.user_id = $3 and h.date = generate_series) subquery1            
                    join (
                        select date as todo_date, sum(todo::integer) over(order by date) as todo_byday from (
                        select generate_series as date, dp.weekdays_count->>(select ((extract(dow from generate_series) + 6)::integer % 7)::integer) as todo
                        from generate_series((select start_date from daily_plan where deal_id = $2), current_date::date, '1 day')
                        join public.daily_plan dp on dp.deal_id = $2 and dp.user_id = $3
                        left join public.history h on h.deal_id = $2 and h.user_id = $3 and h.date = generate_series) subquery2
                    ) as todoTable on todoTable.todo_date = date            
                    where extract(year from current_date - date::timestamp) <= $1
                `,
            [statConfig.lastDaysCount, planRow.deal_id, userId],
        );

        return historyRows;
    }

    async verifyUserHasPlan(planId: number, userId: number) {
        const res = await this.databaseService.dbClient.query(
            'select * from public.daily_plan where id = $1 and user_id = $2',
            [planId, userId],
        );
        if (res.rowCount === 0) throw new ForbiddenException(`Current user can't manage that plan`);
        if (res.rowCount > 1) throw new InternalServerErrorException('Strangely plans are not unique');

        return res.rows[0];
    }

    async verifyUserHasDeal(dealId: number, userId: number) {
        const res = await this.databaseService.dbClient.query(
            'select * from public.deal where id = $1 and user_id = $2',
            [dealId, userId],
        );
        if (res.rowCount === 0) throw new ForbiddenException(`Current user can't manage that deal`);
        if (res.rowCount > 1) throw new InternalServerErrorException('Strangely deals are not unique');

        return res.rows[0];
    }
}
