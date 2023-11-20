import { Injectable } from '@nestjs/common';
import { Client, ClientConfig } from 'pg';
import 'dotenv/config';

@Injectable()
export class AppService {
    public constructor() {}
}
