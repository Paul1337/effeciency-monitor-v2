import { Injectable, Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
@Injectable()
export class UsersService {
    public constructor(private usersRepository: UsersRepository) {}

    async getUsers() {
        return this.usersRepository.getUsers();
    }
}
