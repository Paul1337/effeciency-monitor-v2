import { Module } from '@nestjs/common';
import { LongPlansService } from './long-plans.service';
import { LongPlansController } from './long-plans.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [LongPlansController],
    providers: [LongPlansService],
})
export class LongPlansModule {}
