import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Post('login')
    login(@Body() body: { username: string, password: string }) {
        return {
            message: 'Login successful',
            token: '1234567890',
        }
    }

    @Post('register')
    register(@Body() body: { username: string, password: string }) {
        return {
            message: 'Register successful',
            token: '1234567890',
        }
    }
}
