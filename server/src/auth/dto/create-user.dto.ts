import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @Length(4)
    email: string;

    @IsNotEmpty()
    @Length(3)
    password: string;
}
