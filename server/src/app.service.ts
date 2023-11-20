import { Injectable } from '@nestjs/common';
import { Client, ClientConfig } from 'pg';
import 'dotenv/config';

const connectionConfig: ClientConfig = {
    host: process.env.host,
    user: process.env.dbuser,
    password: process.env.dbpassword,
    database: process.env.dbname,
};

@Injectable()
export class AppService {
    dbClient: Client;
    public constructor() {
        this.dbClient = new Client(connectionConfig);
        this.init();
    }

    async init() {
        console.log('attempting to connect');
        await this.dbClient
            .connect()
            .catch(err => console.log('caught', err))
            .then(() => console.log('connected'));
    }

    async getSomethingFromDB() {
        const res = await this.dbClient.query('select * from public.user');
        return res.rows[0];
        // await client.end();
        // return {
        //     some: 'data',
        // };
    }
}
