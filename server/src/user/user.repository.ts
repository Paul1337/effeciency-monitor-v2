import { Injectable } from '@nestjs/common';
import pg, { Client, ClientConfig } from 'pg';
import { CreateUserDto } from './user.model';

const connectionConfig: ClientConfig = {
    host: process.env.host,
    user: process.env.dbuser,
    password: process.env.dbpassword,
    database: process.env.dbname,
};

@Injectable()
export class UserRepository {
    dbClient: Client;

    public constructor() {
        this.connectToDb();
    }

    public async connectToDb() {
        this.dbClient = new Client(connectionConfig);
        console.log('attempting to connect');
        await this.dbClient
            .connect()
            .catch(err => console.log('caught', err))
            .then(() => console.log('connected'));
    }

    async addUser(createUserDto: CreateUserDto) {
        await this.dbClient.query('insert into public.user (email, password) values ($1, $2)', [
            createUserDto.email,
            createUserDto.password,
        ]);
    }

    async getUsers() {
        const res = await this.dbClient.query('select * from public.user');
        return res.rows;
    }
}
