import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller({
    path: '/users',
})
export class UsersController {
    public constructor(private userService: UsersService) {}

    @Get('/')
    getAll() {
        return this.userService.getUsers();
    }
}
