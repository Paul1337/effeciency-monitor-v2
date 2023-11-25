import { Injectable } from '@nestjs/common';
import { CreateUserParams, User } from './users.model';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersRepository {
    public constructor(public databaseService: DatabaseService) {}

    async addUser(createUserDto: CreateUserParams) {
        await this.databaseService.dbClient.query(
            'insert into public.user (email, password) values ($1, $2)',
            [createUserDto.email, createUserDto.password],
        );
    }

    async getUsers() {
        const res = await this.databaseService.dbClient.query('select * from public.user');
        return res.rows;
    }

    async findUserByEmail(email: string): Promise<User> {
        const res = await this.databaseService.dbClient.query(
            'select * from public.user where email=$1',
            [email],
        );
        return res.rows[0] as User;
    }

    async getProfile() {}
}
