import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DealsService {
    public constructor(private readonly databaseService: DatabaseService) {}

    async create(createDealDto: CreateDealDto, userId: number) {
        await this.databaseService.dbClient.query(
            'insert into public.deal (name, user_id) values ($1, $2)',
            [createDealDto.name, userId],
        );
    }

    async findAll(userId: number) {
        const res = await this.databaseService.dbClient.query(
            'select * from public.deal where user_id=$1',
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
