import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
@Module({
  imports: [AuthModule, ConfigModule.forRoot({isGlobal: true}), PrismaModule, UserModule],
  providers: [UserService],
})
export class AppModule {}
