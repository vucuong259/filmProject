import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { AuthService } from '../auth/auth.service';

const saltOrRounds = 10;
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const existUser = await this.userModel.findOne({
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
      await this.userModel.create(createUserDto);
      return {
        msg: 'Thành công',
      };
    } catch (error) {
      return { msg: error };
    }
  }

  async login(loginDto: LoginDto) {
    const existUser = await this.userModel
      .findOne({
        $or: [
          { username: loginDto.usernameOrEmail },
          { email: loginDto.usernameOrEmail },
        ],
      })
      .lean();
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

  async findOne(id: string) {
    return await this.userModel.findOne({ _id: id }).select('-password').lean();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
