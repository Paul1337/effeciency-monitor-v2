import { Injectable } from '@nestjs/common';
import pg, { Client, ClientConfig } from 'pg';

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

    async getUsers() {
        const res = await this.dbClient.query('select * from public.user');
        return res.rows;
    }
}
