import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, CreateUserDto } from './auth.model';

@Controller('auth')
export class AuthController {
    public constructor(private authService: AuthService) {}

    @Post('/log_in')
    logIn() {
        // this.authService.logIn();
        return 'log in method';
    }

    @Post('/reg')
    async register(@Body() createUserDto: CreateUserDto) {
        try {
            await this.authService.register(createUserDto);
            return 'registration ok';
        } catch (err) {
            return 'registration failed ' + err;
        }
    }

    @Post('/')
    auth(authDto: AuthDto) {
        return this.authService.auth(authDto);
    }
}
