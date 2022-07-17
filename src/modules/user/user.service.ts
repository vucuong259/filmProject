import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserCreateDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { AuthService } from '../auth/auth.service';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

const saltOrRounds = 10;
@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  async create(createUserDto: UserCreateDto) {
    try {
      const existUser = await this.userRepository.findOneWithFilters({
        $or: [
          { username: createUserDto.username },
          { email: createUserDto.email },
        ],
      });
      if (existUser) {
        throw new BadRequestException({
          error: `User ${createUserDto.username} already exists`,
        });
      }
      const salt = bcrypt.genSaltSync(saltOrRounds);
      const hashPassword = await bcrypt.hash(createUserDto.password, salt);
      createUserDto.password = hashPassword;
      await this.userRepository.create(createUserDto);
      return {
        msg: 'Thành công',
      };
    } catch (error) {
      return { msg: error };
    }
  }

  async login(loginDto: LoginDto) {
    const existUser = await this.userRepository.findOneWithFilters({
      $or: [
        { username: loginDto.usernameOrEmail },
        { email: loginDto.usernameOrEmail },
      ],
    });
    if (!existUser) {
      throw new BadRequestException({
        error: `Email or password mismatch`,
      });
    }
    const isMatch = await bcrypt.compare(loginDto.password, existUser.password);
    if (!isMatch) {
      throw new BadRequestException({
        error: `Email or password mismatch`,
      });
    }
    const access_token = await this.authService.createAccessToken(
      existUser._id.toString(),
    );
    return {
      user_id: existUser._id,
      access_token: access_token,
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(query: any): Promise<User> {
    return await this.userRepository.findOneWithFilters(query);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
