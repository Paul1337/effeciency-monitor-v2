import { Injectable, Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './user.model';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    public constructor(private userRepository: UserRepository) {}

    async logIn() {}
    async register(createUserDto: CreateUserDto) {
        const userWithSameEmail = await this.userRepository.findUserByEmail(createUserDto.email);
        if (userWithSameEmail) return Promise.reject('user exists');
        createUserDto.password = bcrypt.hashSync(createUserDto.password, 5);
        await this.userRepository.addUser(createUserDto);
    }

    async logOut() {}
    async auth() {
        return this.userRepository.getUsers();
    }

    async getUsers() {
        return this.userRepository.getUsers();
    }
}
