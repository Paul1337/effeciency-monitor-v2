import { Injectable, Module } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    public constructor(public userRepository: UserRepository) {}

    async logIn() {}
    async register() {}
    async logOut() {}
    async auth() {
        return this.userRepository.getUsers();
    }
}
