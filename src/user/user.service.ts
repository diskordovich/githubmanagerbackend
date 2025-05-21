import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/CreateUserDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async getUserByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        })
        return user
    }

    async getUserById(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        })
        return user
    }

    async createUser(createUserDto: CreateUserDto) {
        const user = await this.prisma.user.create({
            data: {
                email: createUserDto.email,
                password: createUserDto.password,
            },
        })
        return user
    }
}
