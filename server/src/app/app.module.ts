import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [AuthModule, UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
