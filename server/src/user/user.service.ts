import { Injectable, Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
@Injectable()
export class UserService {
    public constructor(private userRepository: UserRepository) {}

    async getUsers() {
        return this.userRepository.getUsers();
    }
}
