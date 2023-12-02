import { Injectable } from '@nestjs/common';
import { Client, ClientConfig } from 'pg';

const connectionConfig: ClientConfig = {
    host: process.env.host,
    user: process.env.dbuser,
    password: process.env.dbpassword,
    database: process.env.dbname,
};

@Injectable()
export class DatabaseService {
    public dbClient: Client;

    public constructor() {
        this.connectToDb();
    }

    public async query(request: string, values?: any[]) {
        return this.dbClient.query(request, values);
    }

    public async queryRows(request: string, values?: any[]) {
        return (await this.dbClient.query(request, values)).rows;
    }

    public async connectToDb() {
        this.dbClient = new Client(connectionConfig);
        console.log('attempting to connect');
        await this.dbClient
            .connect()
            .catch(err => console.log('connection error', err))
            .then(() => console.log('connected'));
    }
}
