import { Injectable, Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './user.model';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    public constructor(private userRepository: UserRepository) {}

    async logIn() {
        // 1. check user password hash using bcrypt.compareSync
        // 2. send jwt token back to the client
    }

    async register(createUserDto: CreateUserDto) {
        const userWithSameEmail = await this.userRepository.findUserByEmail(createUserDto.email);
        if (userWithSameEmail) return Promise.reject('user exists');
        createUserDto.password = bcrypt.hashSync(createUserDto.password, 5);
        await this.userRepository.addUser(createUserDto);
    }

    async logOut() {
        // myaybe this service is useless (logout is client-side effect, which removes jwt token from local storage and shows reg form)
    }

    async auth() {
        return this.userRepository.getUsers();
    }

    async getUsers() {
        return this.userRepository.getUsers();
    }
}
