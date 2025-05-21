import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/CreateUserDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

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
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: createUserDto.email,
                password: createUserDto.password,
            },
        })
        return user;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }
}
