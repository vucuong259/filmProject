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
  async findWithFilters(query: any, populate: any, projection = {}) {
    if (query.isPaging) {
      const page = query.page || 1;
      const pageSize = query.pageSize || 20;
      return await this.categoryModel
        .find(query, projection)
        .populate(populate)
        .skip(page * pageSize - pageSize)
        .limit(pageSize);
    }
    return await this.categoryModel.find(query).populate(populate);
  }
}
