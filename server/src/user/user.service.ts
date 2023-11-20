import { Injectable, Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './user.model';

@Injectable()
export class UserService {
    public constructor(public userRepository: UserRepository) {}

    async logIn() {}
    async register(createUserDto: CreateUserDto) {
        await this.userRepository.addUser(createUserDto);
    }

    async logOut() {}
    async auth() {
        return this.userRepository.getUsers();
    }
}
