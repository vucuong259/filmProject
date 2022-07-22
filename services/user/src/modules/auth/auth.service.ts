import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(jwtPayload: JwtPayload): Promise<any> {
    const user = await this.userService.findOne({
      _id: jwtPayload.userId,
      status: true,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async createAccessToken(userId: string) {
    const payload: JwtPayload = { userId };
    const access_token = await this.jwtService.sign(payload);
    return access_token;
  }
}
