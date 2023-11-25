import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
@Injectable()
export class UsersService {
    public constructor(private usersRepository: UsersRepository) {}

    async getUsers() {
        return this.usersRepository.getUsers();
    }

    async getProfile() {
        this.usersRepository.getProfile();
    }
}
