import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCreateDto } from '../dto/create-user.dto';
import { IUser } from '../interfaces/user.interface';
import { User, UserDocument } from '../schemas/User.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userCreatedto: UserCreateDto): Promise<User> {
    let newUser = new this.userModel(userCreatedto);
    return await newUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }
  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id });
  }
  async findOneWithFilters(filter: any): Promise<IUser> {
    return await this.userModel.findOne(filter);
  }
  async findWithFilters(filter: any) {
    let name = Object.is(filter.name, undefined) ? '' : filter.name;
    let designation = Object.is(filter.designation, undefined)
      ? ''
      : filter.designation;
    return await this.userModel.find({
      $and: [
        { designation: { $regex: designation } },
        { firstName: { $regex: name } },
      ],
    });
  }
  async update(user: any): Promise<User> {
    return await this.userModel.findOneAndUpdate(
      { _id: user.id },
      { nearestCity: user.city },
      {
        new: true,
      },
    );
  }
}
