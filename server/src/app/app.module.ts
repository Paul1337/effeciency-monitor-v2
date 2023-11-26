import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { DealsModule } from 'src/deals/deals.module';
import { DailyPlansModule } from 'src/daily-plans/daily-plans.module';
import { LongPlansModule } from 'src/long-plans/long-plans.module';
import { HistoryModule } from 'src/history/history.module';

@Module({
    imports: [AuthModule, UserModule, DealsModule, DailyPlansModule, LongPlansModule, HistoryModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
