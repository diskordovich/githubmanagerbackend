import { Controller, Post, Body, Res } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/CreateUserDto';
import { LoginDto } from './dto/LoginDto';
import { AuthService } from './auth.service';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    @Post('login')
    async login(@Body() body: LoginDto, @Res({passthrough: true}) res: Response) {
        const user = await this.authService.login(body)
        return {
            message: "Logged in successfully",
            token: user.access_token
        }
    }

    @Post('register')
    async register(@Body() body: CreateUserDto, @Res({passthrough: true}) res: Response) {
        const user = await this.authService.register(body)
        return {
            message: "Registered successfully",
            token: user.access_token
        }
    }
}
