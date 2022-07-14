import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonConst } from '../../shared/constant/common.const';
import { CreateOrderDto } from './dto/create-orders.dto';
import { UpdateOrderDto } from './dto/update-orders.dto';
import { IOrder } from './interfaces/orders.interface';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(CommonConst.PRODUCT_SCHEMA_NAME)
    private readonly productModel: Model<IOrder>,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
