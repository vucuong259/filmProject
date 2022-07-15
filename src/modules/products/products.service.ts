import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonConst } from '../../shared/constant/common.const';
import { IUser } from '../user/interfaces/user.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ICategory } from './interfaces/category.interface';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(CommonConst.PRODUCT_SCHEMA_NAME)
    private readonly productModel: Model<IProduct>,
    @InjectModel(CommonConst.CATEGORY_SCHEMA_NAME)
    private readonly categoryModel: Model<ICategory>,
  ) {}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async createCategory(user: IUser, createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory: any = createCategoryDto;
      newCategory.createBy = user._id;
      await this.categoryModel.create(createCategoryDto);
      return {
        msg: 'Thành công',
      };
    } catch (error) {
      return { msg: error };
    }
  }

  findAll() {
    return `This action returns all products`;
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
