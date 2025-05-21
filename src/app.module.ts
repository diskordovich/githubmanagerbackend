import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { GithubModule } from './github/github.module';
@Module({
  imports: [AuthModule, ConfigModule.forRoot({isGlobal: true}), PrismaModule, UserModule, GithubModule],
  providers: [UserService],
})
export class AppModule {}
