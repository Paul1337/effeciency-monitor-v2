import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller({
    path: '/user',
})
export class UserController {
    public constructor(private userService: UserService) {}

    @Get('/log_in')
    logIn() {
        this.userService.logIn();
        return 'log in method';
    }

    @Get('/reg')
    register() {
        this.userService.register();
        return 'register method';
    }

    @Get('/auth')
    auth() {
        return this.userService.auth();
    }

    @Get('/log_in')
    logOut() {
        this.userService.logOut();
        return 'log out';
    }
}
