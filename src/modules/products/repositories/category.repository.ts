import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/Category.schema';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(categoryCreateDto: any): Promise<Category> {
    let newCategory = new this.categoryModel(categoryCreateDto);
    return await newCategory.save();
  }

  async findAll() {
    return await this.categoryModel.find().populate('user');
  }
  async findWithFilters(filter: any) {
    return await this.categoryModel
      .find(filter)
      .populate([{ path: 'isChildOf', select: 'name' }, 'createdBy']);
  }
}
