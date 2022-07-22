import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CommonConst } from '../../shared/constant/common.const';
import { User } from '../user/entities/user.entity';
import { IUser } from '../user/interfaces/user.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from './interfaces/product.interface';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryDocument } from './schemas/category.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(CommonConst.PRODUCT_SCHEMA_NAME)
    private readonly productModel: Model<IProduct>,
    private categoryRepository: CategoryRepository,
  ) {}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async createCategory(user: IUser, createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.categoryRepository.create({
        ...createCategoryDto,
        createdBy: user._id,
      });
      return {
        msg: 'Thành công',
        response: newCategory,
      };
    } catch (error) {
      return { msg: error };
    }
  }

  findAll() {
    return `This action returns all products`;
  }
  async findAllCategory() {
    const allCategory = await this.categoryRepository.findWithFilters(
      {
        isDisabled: false,
      },
      'createdBy',
    );
    return {
      response: allCategory,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
