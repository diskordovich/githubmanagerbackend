import { ArgumentMetadata, Injectable, PipeTransform, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserFromTokenPipe implements PipeTransform {
  public constructor(
    private readonly jsonWebTokenService: JwtService,
    private readonly usersService: UserService
  ) { }

  public async transform(token: string, _metadata: ArgumentMetadata) {
    try {
      const payload = this.jsonWebTokenService.verify(token);

      const user = await this.usersService.getUserById(payload.id);

      if (!user) {
        throw new UnauthorizedException("Invalid user");
      }

      return user;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException("Token is expired");
    }
  }
}