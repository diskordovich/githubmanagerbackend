import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    async login(username: string, password: string) {
        return {
            message: 'Login successful',
            token: '1234567890',
        }
    }

    async register(username: string, password: string) {
        return {
            message: 'Register successful',
            token: '1234567890',
        }
    }
}
