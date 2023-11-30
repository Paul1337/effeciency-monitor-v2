import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateDealDto } from './dto/create-deal.dto';

@Injectable()
export class DealsService {
    public constructor(private readonly databaseService: DatabaseService) {}

    async create(createDealDto: CreateDealDto, userId: number) {
        const dealsWithThatName = (
            await this.databaseService.dbClient.query(
                'select id from public.deal where name = $1 and user_id = $2',
                [createDealDto.name, userId],
            )
        ).rows;
        if (dealsWithThatName.length > 0) {
            return dealsWithThatName[0].id;
        }
        const res = await this.databaseService.dbClient.query(
            'insert into public.deal (name, user_id) values ($1, $2) returning id',
            [createDealDto.name, userId],
        );
        return res.rows[0].id;
    }

    async findAll(userId: number) {
        const res = await this.databaseService.dbClient.query(
            'select * from public.deal where user_id=$1',
            [userId],
        );
        return res.rows;
    }

    async findActive(userId: number) {
        const res = await this.databaseService.dbClient.query(
            `select d.* from public.deal d
                left join public.daily_plan dp on dp.deal_id = d.id
                left join public.long_plan lp on lp.deal_id = d.id
                where d.user_id = $1 and (lp.id is not null or dp.id is not null)`,
            [userId],
        );
        return res.rows;
    }

    async remove(id: number, userId: number) {
        await this.databaseService.dbClient.query('delete from public.deal where id=$1 and user_id=$2', [
            id,
            userId,
        ]);
    }
}
