import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/LoginDto';
import { CreateUserDto } from '../user/dto/CreateUserDto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

    async login(loginDto: LoginDto) {
        const user = await this.userService.getUserByEmail(loginDto.email)

        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }
        if (user.password !== loginDto.password) {
            throw new UnauthorizedException('Invalid credentials')
        }
        const payload = { email: user.email, id: user.id }
        return {
            email: user.email,
            access_token: this.jwtService.sign(payload, {expiresIn: '1h'}),
        }
    }

    async register(createUserDto: CreateUserDto) {
        const user = await this.userService.createUser(createUserDto)
        const payload = { email: user.email, id: user.id }
        return {
            email: user.email,
            access_token: this.jwtService.sign(payload, {expiresIn: '1h'}),
        }
    }
}
