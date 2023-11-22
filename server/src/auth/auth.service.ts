import { Injectable } from '@nestjs/common';
import { AuthDto, CreateUserDto, LogInUserDto } from './auth.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
    public constructor(private userRepository: UserRepository) {}

    async logIn(loginUserDto: LogInUserDto) {
        const user = await this.userRepository.findUserByEmail(loginUserDto.email);
        if (!user) return Promise.reject('User does not exist');

        const passwordHash = user.password;
        const passwordOK = bcrypt.compareSync(loginUserDto.password, passwordHash);
        if (!passwordOK) return Promise.reject('Password is not correct!');

        return {
            authToken: jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    timestamp: Date.now(),
                },
                process.env.app_secret,
            ),
        };
    }

    async register(createUserDto: CreateUserDto) {
        const userWithSameEmail = await this.userRepository.findUserByEmail(createUserDto.email);
        if (userWithSameEmail) return Promise.reject('User already exists');
        createUserDto.password = bcrypt.hashSync(createUserDto.password, 5);
        await this.userRepository.addUser(createUserDto);
    }

    async auth(authDto: AuthDto) {}

    async getUsers() {
        return this.userRepository.getUsers();
    }
}
