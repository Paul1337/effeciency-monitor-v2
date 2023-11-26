import { Module } from '@nestjs/common';
import { DailyPlansService } from './daily-plans.service';
import { DailyPlansController } from './daily-plans.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [DailyPlansController],
    providers: [DailyPlansService],
})
export class DailyPlansModule {}
