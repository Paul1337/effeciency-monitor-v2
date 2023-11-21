import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.model';

@Controller({
    path: '/user',
})
export class UserController {
    public constructor(private userService: UserService) {}

    @Get('/')
    getAll() {
        return this.userService.getUsers();
    }

    @Post('/log_in')
    logIn() {
        this.userService.logIn();
        return 'log in method';
    }

    @Post('/reg')
    register(@Body() createUserDto: CreateUserDto) {
        this.userService.register(createUserDto);
        return 'registration succeded';
    }

    @Post('/auth')
    auth() {
        return this.userService.auth();
    }

    @Post('/log_out')
    logOut() {
        this.userService.logOut();
        return 'log out';
    }
}
