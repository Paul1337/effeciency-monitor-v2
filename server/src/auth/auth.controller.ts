import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInUserDto } from './dto/log-in-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
    public constructor(private authService: AuthService) {}

    @Post('/log_in')
    async logIn(@Body() logInDto: LogInUserDto) {
        return this.authService.logIn(logInDto);
    }

    @Post('/reg')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }
}
