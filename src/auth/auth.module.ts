import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET ?? 'secret',
    signOptions: { expiresIn: '1h' },
  }), UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
