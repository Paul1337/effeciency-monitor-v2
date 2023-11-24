import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto, CreateUserDto, LogInUserDto } from './auth.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UsersRepository } from 'src/user/users.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    public constructor(
        private userRepository: UsersRepository,
        private jwtService: JwtService,
    ) {}

    async logIn(loginUserDto: LogInUserDto) {
        const user = await this.userRepository.findUserByEmail(loginUserDto.email);
        if (!user) throw new UnauthorizedException();

        const passwordHash = user.password;
        if (!bcrypt.compareSync(loginUserDto.password, passwordHash)) {
            throw new UnauthorizedException();
        }

        const payload = {
            id: user.id,
            email: user.email,
            timestamp: Date.now(),
        };

        return {
            authToken: await this.jwtService.signAsync(payload),
        };
    }

    async register(createUserDto: CreateUserDto) {
        const userWithSameEmail = await this.userRepository.findUserByEmail(createUserDto.email);
        if (userWithSameEmail)
            throw new HttpException(`User with email ${createUserDto.email} already exists`, 500);
        createUserDto.password = bcrypt.hashSync(createUserDto.password, 5);
        await this.userRepository.addUser(createUserDto);
    }

    async auth(authDto: AuthDto) {}

    async getUsers() {
        return this.userRepository.getUsers();
    }
}
