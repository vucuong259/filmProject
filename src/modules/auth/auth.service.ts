import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { appConfig } from '../../configs/app.config';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(jwtPayload: JwtPayload): Promise<any> {
    const user = await this.userService.findOne(jwtPayload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async createAccessToken(userId: string) {
    const access_token = this.jwtService.sign(userId, {
      secret: appConfig.jwtConfig.secretKey,
      expiresIn: appConfig.jwtConfig.expiresIn,
    });
    return access_token;
  }
}
