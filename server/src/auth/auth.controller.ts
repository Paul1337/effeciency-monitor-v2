import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, CreateUserDto, LogInUserDto } from './auth.model';

@Controller('auth')
export class AuthController {
    public constructor(private authService: AuthService) {}

    @Post('/log_in')
    logIn(logInDto: LogInUserDto) {
        this.authService.logIn(logInDto);
    }

    @Post('/reg')
    async register(@Body() createUserDto: CreateUserDto) {
        await this.authService.register(createUserDto);
    }

    @Post('/')
    auth(authDto: AuthDto) {
        return this.authService.auth(authDto);
    }
}
