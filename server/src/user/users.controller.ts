import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Private } from 'src/auth/decorators/private.decorator';
import { Request } from 'express';

@Controller({
    path: '/users',
})
export class UsersController {
    public constructor(private userService: UsersService) {}

    @Get('/')
    getAll() {
        return this.userService.getUsers();
    }

    @Get('/me')
    @Private()
    getProfile(@Req() req: Request) {
        if (req['user']) {
            return req['user'];
        }
        throw new InternalServerErrorException();
    }
}
