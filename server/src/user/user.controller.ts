import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller({
    path: '/user',
})
export class UserController {
    public constructor(private userService: UserService) {}

    @Get('/')
    getAll() {
        return this.userService.getUsers();
    }
}
